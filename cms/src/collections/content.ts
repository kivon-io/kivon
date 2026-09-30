import type { CollectionConfig } from 'payload'

import { anyone, publishedOrAuthenticated } from '../access'
import { pageBlocks } from '../blocks'
import { cardFields, headingFields, markdownField, seoField, slugField } from '../fields/shared'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', '_status', 'updatedAt'],
  },
  access: { read: publishedOrAuthenticated },
  versions: { drafts: true },
  defaultSort: '-createdAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    markdownField('content'),
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    slugField('title'),
  ],
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  access: { read: anyone },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'articles', type: 'join', collection: 'articles', on: 'categories' },
    { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true },
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { useAsTitle: 'question' },
  access: { read: anyone },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
  ],
}

export const Heroes: CollectionConfig = {
  slug: 'heroes',
  admin: { useAsTitle: 'heading' },
  access: { read: anyone },
  fields: headingFields,
}

export const Logos: CollectionConfig = {
  slug: 'logos',
  admin: { useAsTitle: 'company' },
  access: { read: anyone },
  fields: [
    { name: 'company', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'slug', defaultColumns: ['slug', '_status', 'updatedAt'] },
  access: { read: publishedOrAuthenticated },
  versions: { drafts: true },
  fields: [slugField(), seoField, { name: 'dynamic_zone', type: 'blocks', blocks: pageBlocks }],
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'heading' },
  access: { read: anyone },
  fields: [
    ...headingFields,
    { name: 'live_support_card', type: 'group', fields: cardFields },
    { name: 'market_rate_card', type: 'group', fields: cardFields },
    { name: 'secure_card', type: 'group', fields: cardFields },
    { name: 'transaction_card', type: 'group', fields: cardFields },
  ],
}

export const Steps: CollectionConfig = {
  slug: 'steps',
  admin: { useAsTitle: 'heading' },
  access: { read: anyone },
  fields: [
    ...headingFields,
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'text' },
  access: { read: anyone },
  fields: [
    { name: 'text', type: 'textarea' },
    {
      name: 'user',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const TradeCoins: CollectionConfig = {
  slug: 'trade-coins',
  admin: { useAsTitle: 'heading' },
  access: { read: anyone },
  fields: [...headingFields, { name: 'tag', type: 'text' }],
}
