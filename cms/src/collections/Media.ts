import type { CollectionConfig } from 'payload'

import { anyone } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],
  },
}
