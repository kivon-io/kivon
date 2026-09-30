import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {
  Articles,
  Categories,
  Faqs,
  Heroes,
  Logos,
  Pages,
  Services,
  Steps,
  Testimonials,
  TradeCoins,
} from './collections/content'
import { Global } from './globals/Global'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Public base for uploaded files, e.g. https://<bucket>.<region>.cdn.digitaloceanspaces.com
const mediaBaseURL = process.env.S3_PUBLIC_URL?.replace(/\/$/, '')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Pages,
    Articles,
    Categories,
    Faqs,
    Heroes,
    Logos,
    Services,
    Steps,
    Testimonials,
    TradeCoins,
    Media,
    Users,
  ],
  globals: [Global],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // With a CA, drop ?sslmode from the URL: pg lets it override the ssl option below.
      connectionString: process.env.DATABASE_CA_CERT
        ? (process.env.DATABASE_URL || '').replace(/[?&]sslmode=[^&]*/, '')
        : process.env.DATABASE_URL || '',
      // Vercel functions each open their own pool; keep it tiny and go through the DO connection pool.
      max: 2,
      ssl: process.env.DATABASE_CA_CERT
        ? { ca: process.env.DATABASE_CA_CERT.replace(/\\n/g, '\n'), rejectUnauthorized: true }
        : undefined,
    },
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'cms',
          // Serve files straight from the Spaces CDN instead of proxying through Payload.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${mediaBaseURL}/${[prefix, filename].filter(Boolean).join('/')}`,
        },
      },
      bucket: process.env.S3_BUCKET || '',
      acl: 'public-read',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: false,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
