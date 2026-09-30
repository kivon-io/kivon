import * as migration_20260930_072754_initial from './20260930_072754_initial';
import * as migration_20260930_074506_media_storage_fields from './20260930_074506_media_storage_fields';

export const migrations = [
  {
    up: migration_20260930_072754_initial.up,
    down: migration_20260930_072754_initial.down,
    name: '20260930_072754_initial',
  },
  {
    up: migration_20260930_074506_media_storage_fields.up,
    down: migration_20260930_074506_media_storage_fields.down,
    name: '20260930_074506_media_storage_fields'
  },
];
