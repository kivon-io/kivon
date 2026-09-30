import type { Block } from 'payload'

import { buttonFields, headingFields, linkFields, markdownField } from '../fields/shared'

// Block slugs mirror the old Strapi component names with "." replaced by "__",
// so the site can map blockType back to __component (e.g. dynamic-zone__hero -> dynamic-zone.hero).

export const HeaderBlock: Block = {
  slug: 'shared__header',
  dbName: 'pages_header',
  labels: { singular: 'Header', plural: 'Headers' },
  fields: headingFields,
}

export const HeroBlock: Block = {
  slug: 'dynamic-zone__hero',
  dbName: 'pages_hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [{ name: 'hero', type: 'relationship', relationTo: 'heroes' }],
}

export const StepsBlock: Block = {
  slug: 'dynamic-zone__steps',
  dbName: 'pages_steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [{ name: 'step', type: 'relationship', relationTo: 'steps' }],
}

export const DiscoverCoinsBlock: Block = {
  slug: 'dynamic-zone__discover-coins',
  dbName: 'pages_coins',
  labels: { singular: 'Discover coins', plural: 'Discover coins' },
  fields: [
    { name: 'coins', type: 'relationship', relationTo: 'logos', hasMany: true },
    { name: 'trade_coin', type: 'relationship', relationTo: 'trade-coins' },
  ],
}

export const ServicesBlock: Block = {
  slug: 'dynamic-zone__services',
  dbName: 'pages_services',
  labels: { singular: 'Services', plural: 'Services' },
  fields: [{ name: 'services', type: 'relationship', relationTo: 'services', hasMany: true }],
}

export const TestimonialsBlock: Block = {
  slug: 'dynamic-zone__testimonials',
  dbName: 'pages_testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'sub_heading', type: 'text' },
    { name: 'testimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true },
  ],
}

export const FaqBlock: Block = {
  slug: 'dynamic-zone__faq',
  dbName: 'pages_faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...headingFields,
    { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true },
  ],
}

export const ContentBlock: Block = {
  slug: 'dynamic-zone__content',
  dbName: 'pages_content',
  labels: { singular: 'Content', plural: 'Content' },
  fields: [markdownField('content'), { name: 'image', type: 'upload', relationTo: 'media' }],
}

export const ContactBlock: Block = {
  slug: 'dynamic-zone__contact',
  dbName: 'pages_contact',
  labels: { singular: 'Contact', plural: 'Contact' },
  fields: [
    {
      name: 'contacts',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'button', type: 'group', fields: linkFields },
      ],
    },
    {
      name: 'community',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'button', type: 'group', fields: buttonFields },
      ],
    },
  ],
}

export const pageBlocks: Block[] = [
  TestimonialsBlock,
  FaqBlock,
  DiscoverCoinsBlock,
  ServicesBlock,
  StepsBlock,
  HeroBlock,
  HeaderBlock,
  ContentBlock,
  ContactBlock,
]
