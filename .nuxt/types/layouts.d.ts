import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.5.1_@types+node@20.19.19_db0@0.3.4_ioredis@5.8.0_magicast_4c21ba17262d25664715e78301c37f12/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}