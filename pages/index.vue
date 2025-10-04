<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Motels</h1>

    <div class="flex items-center gap-2">
      <input
        v-model="q"
        type="text"
        placeholder="Search motel…"
        class="w-80 rounded-md border px-3 py-2 text-sm"
        @keydown.enter="load"
      />
      <button class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" @click="load">Search</button>
    </div>

    <DataTable
      :headers="headers"
      :rows="filtered"
      :rowKey="(r) => r.id"
    >
      <template #cell:motel_name="{ row }">
        <NuxtLink :to="`/motels/${row.id}`" class="text-blue-600 hover:underline">
          {{ row.motel_name }}
        </NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/DataTable.vue'
const api = useApi()

const q = ref('')
const rows = ref<{ id: number; motel_name: string; location?: string; created_at?: string }[]>([])
const loading = ref(false)

const headers = [
  { key: 'id', label: 'ID' },
  { key: 'motel_name', label: 'Motel' },
  { key: 'location', label: 'Location' },
  { key: 'created_at', label: 'Created' }
]

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return rows.value
  return rows.value.filter(r =>
    r.motel_name?.toLowerCase().includes(term) ||
    r.location?.toLowerCase().includes(term)
  )
})

async function load() {
  try {
    loading.value = true
    // You can expose a dedicated motels endpoint; otherwise, take from reports summary
    const { data } = await api.get('/motels/list') // build a small BE endpoint that returns all motels
    rows.value = data?.items ?? data ?? []
  } catch (e: any) {
    console.error(e)
    alert(e?.response?.data?.detail || 'Failed to load motels')
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
