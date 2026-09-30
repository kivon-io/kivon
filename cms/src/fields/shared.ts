import type { Field } from 'payload'

export const targetField: Field = {
  name: 'target',
  type: 'select',
  options: ['_blank', '_self', '_parent', '_top'],
}

export const spanField: Field = {
  name: 'span',
  type: 'select',
  options: ['one', 'two', 'three'],
}

export const headingFields: Field[] = [
  { name: 'heading', type: 'text' },
  { name: 'sub_heading', type: 'textarea' },
]

// shared.link
export const linkFields: Field[] = [
  { name: 'text', type: 'text' },
  { name: 'URL', type: 'text' },
  targetField,
  { name: 'description', type: 'text' },
]

// shared.button
export const buttonFields: Field[] = [
  { name: 'text', type: 'text' },
  { name: 'URL', type: 'text' },
  targetField,
  {
    name: 'variant',
    type: 'select',
    options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
  },
]

// shared.navigation-column
export const navigationColumnFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'items', type: 'array', fields: linkFields },
  { name: 'key', type: 'select', options: ['business', 'services'] },
]

// cards.live-support / market-rate / secure-card / transaction-card
export const cardFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'description', type: 'textarea' },
  spanField,
]

// shared.seo
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'metaImage', type: 'upload', relationTo: 'media' },
    { name: 'keywords', type: 'textarea' },
    { name: 'metaRobots', type: 'text' },
    { name: 'structuredData', type: 'json' },
    { name: 'metaViewport', type: 'text' },
    { name: 'canonicalURL', type: 'text' },
  ],
}

export const slugField = (from?: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: from ? `URL segment. Generated from the ${from} if left empty.` : 'URL segment.',
  },
  hooks: from
    ? {
        beforeValidate: [
          ({ value, data }) =>
            value ||
            String(data?.[from] ?? '')
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, ''),
        ],
      }
    : undefined,
})

export const markdownField = (name: string): Field => ({
  name,
  type: 'textarea',
  admin: { description: 'Markdown', rows: 24 },
})
