import qs from "qs"
/**
 * Fetches content from the Payload CMS (cms/) and returns it in the Strapi response
 * shape the site was built against: `{ data }`, `__component` on page blocks and
 * `alternativeText` / `name` on media.
 *
 * @param {string} contentType - The collection to fetch (e.g. "pages", "articles"), or "global".
 * @param {object} params - Strapi-style query params; only `filters` and `sort` are used.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number
  [key: string]: unknown // Allow for any additional fields
}

interface StrapiResponse {
  data: StrapiData | StrapiData[]
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0]
  }
  if (!Array.isArray(data.data)) {
    return data.data
  }
  return null
}

const OPERATORS: Record<string, string> = {
  $eq: "equals",
  $ne: "not_equals",
  $in: "in",
  $notIn: "not_in",
  $lt: "less_than",
  $lte: "less_than_equal",
  $gt: "greater_than",
  $gte: "greater_than_equal",
  $contains: "like",
  $containsi: "like",
  $null: "exists",
}

// Strapi `filters` -> Payload `where`, e.g. { categories: { name: "x" } } -> { "categories.name": { equals: "x" } }
function toWhere(filters: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const where: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(filters)) {
    const isObject = value !== null && typeof value === "object" && !Array.isArray(value)
    const isOperator = isObject && Object.keys(value).every((k) => k.startsWith("$"))
    if (isObject && !isOperator) {
      Object.assign(where, toWhere(value as Record<string, unknown>, `${prefix}${key}.`))
      continue
    }
    const path = `${prefix}${key}`.replace(/\.id$/, "")
    if (isOperator) {
      for (const [op, operand] of Object.entries(value as Record<string, unknown>)) {
        where[path] = { [OPERATORS[op] ?? op.slice(1)]: op === "$null" ? !operand : operand }
      }
    } else {
      where[path] = { equals: value }
    }
  }
  return where
}

function isMedia(node: Record<string, unknown>) {
  return typeof node.url === "string" && typeof node.mimeType === "string"
}

function isJoin(node: Record<string, unknown>) {
  return Array.isArray(node.docs) && "hasNextPage" in node
}

// Payload doc -> Strapi-shaped doc
function toStrapiShape(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(toStrapiShape)
  if (node === null || typeof node !== "object") return node

  const obj = node as Record<string, unknown>
  if (isJoin(obj)) return toStrapiShape(obj.docs)

  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) out[key] = toStrapiShape(value)

  if (typeof obj.blockType === "string") out.__component = obj.blockType.replace("__", ".")
  if (isMedia(obj)) {
    out.alternativeText = obj.alt ?? null
    out.name = obj.filename
  }
  return out
}

// Strapi only returns the dynamic-zone components listed in `populate.<field>.on`, and
// callers rely on that (e.g. getHeroData reads dynamic_zone[0]). Payload returns every block.
function applyOnFilters(docs: unknown, populate: unknown): unknown {
  if (!populate || typeof populate !== "object") return docs
  const list = Array.isArray(docs) ? docs : [docs]
  for (const [field, config] of Object.entries(populate as Record<string, unknown>)) {
    const on = (config as { on?: Record<string, unknown> } | null)?.on
    if (!on) continue
    for (const doc of list as Record<string, unknown>[]) {
      const blocks = doc?.[field]
      if (Array.isArray(blocks)) {
        doc[field] = blocks.filter((block) => block.__component in on)
      }
    }
  }
  return docs
}

export default async function fetchContentType(
  contentType: string,
  params: Record<string, unknown> = {},
  spreadData?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const isGlobal = contentType === "global"
    const query = qs.stringify(
      {
        depth: 2,
        ...(isGlobal
          ? {}
          : {
              where: toWhere((params.filters as Record<string, unknown>) ?? {}),
              // Strapi returned entries in id order; the CMS import kept that order.
              sort: (params.sort as string) ?? "id",
              limit: 100,
            }),
      },
      { encodeValuesOnly: true }
    )

    const url = new URL(
      isGlobal ? `api/globals/${contentType}` : `api/${contentType}`,
      process.env.NEXT_PUBLIC_API_URL
    )

    const response = await fetch(`${url.href}?${query}`, {
      method: "GET",
      next: { revalidate: 120 },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from CMS (url=${url.toString()}, status=${response.status})`
      )
    }

    const json = await response.json()
    const data = applyOnFilters(toStrapiShape(isGlobal ? json : json.docs), params.populate)
    const jsonData = { data } as StrapiResponse
    return spreadData ? spreadStrapiData(jsonData) : jsonData
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error("FetchContentTypeError", error)
    // Return null instead of undefined to make error handling easier
    return null
  }
}
