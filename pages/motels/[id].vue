<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">
        Reports — {{ motel?.motel_name || 'Motel' }}
      </h1>
      <div class="text-gray-500" v-if="motel?.location">📍 {{ motel.location }}</div>
    </div>

    <div class="flex items-center gap-2">
      <input v-model="search" class="w-72 rounded-md border px-3 py-2 text-sm" placeholder="Search department / auditor…" />
      <input v-model="start" type="date" class="rounded-md border px-3 py-2 text-sm" />
      <input v-model="end" type="date" class="rounded-md border px-3 py-2 text-sm" />
      <button class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" @click="load">Filter</button>
    </div>

    <DataTable :headers="headers" :rows="filtered">
      <template #cell:report_date="{row}">
        {{ formatDate(row.report_date) }}
      </template>
      <template #cell:property_name="{row}">
        <NuxtLink :to="`/reports/${row.id}`" class="text-blue-600 hover:underline">
          {{ row.property_name }}
        </NuxtLink>
      </template>
      <template #actions="{row}">
        <NuxtLink :to="`/reports/${row.id}`" class="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">Open</NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/DataTable.vue'
const route = useRoute()
const api = useApi()

const motelId = Number(route.params.id)
const motel = ref<any>(null)
const rows = ref<any[]>([])
const search = ref('')
const start = ref<string>('')
const end = ref<string>('')

const headers = [
  { key: 'id', label: 'ID' },
  { key: 'report_date', label: 'Report Date' },
  { key: 'department', label: 'Department' },
  { key: 'auditor', label: 'Auditor' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'occupancy', label: 'Occupancy' },
  { key: 'property_name', label: 'Property' }
]

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return rows.value
  return rows.value.filter(r =>
    r.department?.toLowerCase().includes(term) ||
    r.auditor?.toLowerCase().includes(term)
  )
})

function formatDate(d?: string) {
  try { return d ? new Date(d).toLocaleDateString() : '—' } catch { return d || '—' }
}

async function load() {
  try {
    // Optional: get motel info
    const motelRes = await api.get(`/reports?motel_id=${motelId}`)
    motel.value = motelRes.data

    const params: Record<string, any> = { motel_id: motelId, page: 1, limit: 200 }
    if (start.value) params.start_date = start.value
    if (end.value) params.end_date = end.value
    if (search.value) params.department = search.value // or keep as separate if BE supports free-text

    const { data } = await api.get('/reports', { params })
    rows.value = (data?.items ?? []).map(item => ({
      ...item,
      property_name: `${item.motel_name ?? ''} — ${item.location ?? ''}`.trim()
    }))
    if (rows.value.length > 0) {
      motel.value = {
        motel_name: rows.value[0].motel_name,
        location: rows.value[0].location
      }
    }
  } catch (e: any) {
    console.error(e)
    alert(e?.response?.data?.detail || 'Failed to load reports')
  }
}

onMounted(load)
watch([search, start, end], () => {}, { deep: true })
</script>
