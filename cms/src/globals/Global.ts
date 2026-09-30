import type { GlobalConfig } from 'payload'

import { anyone } from '../access'
import { navigationColumnFields, seoField, targetField } from '../fields/shared'

export const Global: GlobalConfig = {
  slug: 'global',
  label: 'Site settings',
  access: { read: anyone },
  fields: [
    seoField,
    {
      name: 'navbar',
      type: 'group',
      fields: [
        { name: 'logo', type: 'relationship', relationTo: 'logos' },
        { name: 'items', type: 'array', fields: navigationColumnFields },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'logo', type: 'relationship', relationTo: 'logos' },
        { name: 'description', type: 'textarea' },
        { name: 'copyright', type: 'text' },
        { name: 'columns', type: 'array', fields: navigationColumnFields },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'text' },
        {
          name: 'social_media_links',
          type: 'array',
          fields: [
            { name: 'text', type: 'text' },
            { name: 'URL', type: 'text' },
            targetField,
          ],
        },
      ],
    },
  ],
}
