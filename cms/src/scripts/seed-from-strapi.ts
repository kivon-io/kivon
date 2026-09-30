/**
 * One-time import of the Strapi Cloud export (./strapi-export) into Payload.
 *
 *   npm run seed:strapi            # refuses if pages already exist
 *   npm run seed:strapi -- --force # import anyway (creates duplicates)
 */
import fs from 'node:fs'
import path from 'node:path'
import { getPayload, type Field, type CollectionSlug } from 'payload'

import config from '../payload.config'

type StrapiDoc = Record<string, any>

const EXPORT_DIR = path.resolve(process.cwd(), 'strapi-export')
const read = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(EXPORT_DIR, 'content', `${name}.json`), 'utf8'))

const payload = await getPayload({ config })

if (!process.argv.includes('--force')) {
  const { totalDocs } = await payload.count({ collection: 'pages' })
  if (totalDocs > 0) {
    payload.logger.error(`Database already has ${totalDocs} pages. Re-run with --force to import anyway.`)
    process.exit(1)
  }
}

// Strapi id -> Payload id, per collection
const ids: Record<string, Map<number, number | string>> = {}
const mediaByUrl = new Map<string, number | string>()

// ---- media: upload every file once, keeping the alt text Strapi had
const altByUrl = new Map<string, string>()
const collectMedia = (node: unknown): void => {
  if (Array.isArray(node)) return node.forEach(collectMedia)
  if (node && typeof node === 'object') {
    const obj = node as StrapiDoc
    if (typeof obj.url === 'string' && obj.mime) altByUrl.set(obj.url, obj.alternativeText || '')
    Object.values(obj).forEach(collectMedia)
  }
}
for (const f of fs.readdirSync(path.join(EXPORT_DIR, 'content'))) collectMedia(read(f.replace(/\.json$/, '')))

for (const [url, alt] of altByUrl) {
  const filePath = path.join(EXPORT_DIR, 'media', path.basename(url))
  const doc = await payload.create({ collection: 'media', data: { alt }, filePath })
  mediaByUrl.set(url, doc.id)
}
payload.logger.info(`media: ${mediaByUrl.size}`)

// ---- convert a Strapi entry into Payload data using the Payload field config
const relId = (relationTo: string, v: StrapiDoc | null | undefined) =>
  v ? ids[relationTo]?.get(v.id) : undefined

function convert(fields: Field[], src: StrapiDoc): StrapiDoc {
  const out: StrapiDoc = {}
  for (const field of fields) {
    if (!('name' in field)) continue
    const v = src?.[field.name]
    switch (field.type) {
      case 'upload':
        out[field.name] = v?.url ? mediaByUrl.get(v.url) : null
        break
      case 'relationship': {
        const to = field.relationTo as string
        out[field.name] = field.hasMany
          ? ((v as StrapiDoc[]) ?? []).map((r) => relId(to, r)).filter((x) => x !== undefined)
          : (relId(to, v) ?? null)
        break
      }
      case 'group':
        if (v) out[field.name] = convert(field.fields, v)
        break
      case 'array':
        out[field.name] = ((v as StrapiDoc[]) ?? []).map((row) => convert(field.fields, row))
        break
      case 'blocks':
        out[field.name] = ((v as StrapiDoc[]) ?? []).map((b) => {
          const blockType = String(b.__component).replace('.', '__')
          const block = field.blocks.find((x) => x.slug === blockType)
          if (!block) throw new Error(`No block for ${b.__component}`)
          return { blockType, ...convert(block.fields, b) }
        })
        break
      case 'join':
        break
      default:
        if (v !== undefined) out[field.name] = v
    }
  }
  return out
}

const fieldsOf = (slug: string) => payload.collections[slug as CollectionSlug].config.fields

async function importCollection(slug: string, exportName = slug) {
  const hasDrafts = Boolean(payload.collections[slug as CollectionSlug].config.versions?.drafts)
  ids[slug] ??= new Map()
  for (const entry of read(exportName) as StrapiDoc[]) {
    const data = convert(fieldsOf(slug), entry)
    if (hasDrafts) data._status = 'published'
    // Keep the original dates; the blog displays createdAt.
    data.createdAt = entry.createdAt
    data.updatedAt = entry.updatedAt
    const doc = await payload.create({ collection: slug as CollectionSlug, data: data as any })
    ids[slug].set(entry.id, doc.id)
  }
  payload.logger.info(`${slug}: ${ids[slug].size}`)
}

// Order matters: targets of relations are created before the docs that point to them.
await importCollection('categories') // faqs linked below, once they exist
await importCollection('faqs')
for (const entry of read('categories') as StrapiDoc[]) {
  const faqs = ((entry.faqs as StrapiDoc[]) ?? []).map((f) => relId('faqs', f)).filter(Boolean)
  if (faqs.length)
    await payload.update({ collection: 'categories', id: ids.categories.get(entry.id)!, data: { faqs } as any })
}
await importCollection('articles')
await importCollection('heroes')
await importCollection('logos')
await importCollection('trade-coins')
await importCollection('services')
await importCollection('steps')
await importCollection('testimonials')
await importCollection('pages')

const globalConfig = payload.globals.config.find((g) => g.slug === 'global')!
await payload.updateGlobal({ slug: 'global', data: convert(globalConfig.fields, read('global')) as any })
payload.logger.info('global: done')

process.exit(0)
