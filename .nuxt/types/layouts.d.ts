import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../node_modules/.pnpm/nuxt@3.11.2_@parcel+watcher@2.5.1_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5_rollup@4.52.0__1a31b07f7713117b2c8c167473034568/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}