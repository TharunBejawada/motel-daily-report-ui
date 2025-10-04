<template>
  <div class="overflow-x-auto rounded-lg border bg-white">
    <table class="min-w-full text-sm">
      <thead>
        <tr class="bg-gray-50 text-left">
          <th v-for="h in headers" :key="h.key" class="px-4 py-3 font-semibold text-gray-700">
            {{ h.label }}
          </th>
          <th v-if="$slots.actions" class="px-4 py-3 font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="rowKey(row)" class="border-t table-row-hover">
          <td v-for="h in headers" :key="h.key" class="px-4 py-3 text-gray-900">
            <slot :name="`cell:${h.key}`" :row="row">
              {{ formatCell(row[h.key]) }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-4 py-3">
            <slot name="actions" :row="row" />
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="headers.length + ($slots.actions ? 1 : 0)" class="px-4 py-10 text-center text-gray-500">
            No data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type Header = { key: string; label: string }

const props = defineProps<{
  headers: Header[];
  rows: any[];
  rowKey?: (row: any) => string | number;
}>()

const rowKey = (row: any) => props.rowKey?.(row) ?? row.id ?? JSON.stringify(row)

function formatCell(val: unknown) {
  if (val === null || val === undefined) return '—'
  return val
}
</script>
