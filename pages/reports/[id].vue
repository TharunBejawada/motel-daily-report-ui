<template>
  <div v-if="!report"><Spinner /></div>
  <div v-else class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Report #{{ report.id }}</h1>
        <div class="text-gray-600">
          {{ report.motel_name }} <span v-if="report.location">— {{ report.location }}</span>
        </div>
        <div class="text-gray-600">Date: {{ report.report_date }}</div>
      </div>
      <div class="flex gap-2">
        <button class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" @click="download('pdf')">Export PDF</button>
        <button class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" @click="download('docx')">Export DOCX</button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Summary</h2>
        <ul class="space-y-1 text-sm">
          <li><b>Department:</b> {{ report.department || '—' }}</li>
          <li><b>Auditor:</b> {{ report.auditor || '—' }}</li>
          <li><b>Revenue:</b> {{ report.revenue ?? 0 }}</li>
          <li><b>ADR:</b> {{ report.adr ?? 0 }}</li>
          <li><b>Occupancy:</b> {{ report.occupancy ?? 0 }}</li>
          <li><b>Vacant Clean:</b> {{ report.vacant_clean ?? 0 }}</li>
          <li><b>Vacant Dirty:</b> {{ report.vacant_dirty ?? 0 }}</li>
          <li><b>Out of Order / Storage:</b> {{ report.out_of_order_storage_rooms ?? 0 }}</li>
        </ul>
      </div>

      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Property</h2>
        <div class="text-sm">
          <div><b>Property Name:</b> {{ report.property_name }}</div>
          <div><b>Motel:</b> {{ report.motel_name || '—' }}</div>
          <div><b>Location:</b> {{ report.location || '—' }}</div>
          <div><b>Created:</b> {{ report.created_at || '—' }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Complimentary Rooms</h2>
        <ul class="text-sm list-disc pl-5">
          <li v-for="c in report.comp_rooms" :key="c.id">
            Room {{ c.room_number }} <span v-if="c.notes">— {{ c.notes }}</span>
          </li>
          <li v-if="!report.comp_rooms?.length" class="text-gray-500">None</li>
        </ul>
      </div>

      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Incidents</h2>
        <ul class="text-sm list-disc pl-5">
          <li v-for="i in report.incidents" :key="i.id">{{ i.description }}</li>
          <li v-if="!report.incidents?.length" class="text-gray-500">None</li>
        </ul>
      </div>

      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Vacant / Dirty Rooms</h2>
        <ul class="text-sm list-disc pl-5">
          <li v-for="v in report.vacant_dirty_rooms" :key="v.id">
            Room {{ v.room_number }} — {{ v.reason || 'N/A' }} ({{ v.days ?? 0 }} days) <span v-if="v.action">/ {{ v.action }}</span>
          </li>
          <li v-if="!report.vacant_dirty_rooms?.length" class="text-gray-500">None</li>
        </ul>
      </div>

      <div class="rounded-lg border bg-white p-4">
        <h2 class="font-semibold mb-2">Out-of-Order Rooms</h2>
        <ul class="text-sm list-disc pl-5">
          <li v-for="o in report.out_of_order_rooms" :key="o.id">
            Room {{ o.room_number }} — {{ o.reason || 'N/A' }} ({{ o.days ?? 0 }} days) <span v-if="o.action">/ {{ o.action }}</span>
          </li>
          <li v-if="!report.out_of_order_rooms?.length" class="text-gray-500">None</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from '~/components/Spinner.vue'
const route = useRoute()
const api = useApi()

const id = Number(route.params.id)
const report = ref<any | null>(null)

async function load() {
  try {
    const { data } = await api.get(`/reports/${id}`)
    report.value = data
  } catch (e: any) {
    alert(e?.response?.data?.detail || 'Failed to load report')
  }
}

async function download(kind: 'pdf'|'docx') {
  try {
    const url = kind === 'pdf' ? `/reports/${id}/export/pdf` : `/reports/${id}/export/docx`
    const { data } = await api.get(url, { responseType: 'blob' })
    const blob = new Blob([data], { type: kind === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    const dl = document.createElement('a')
    dl.href = URL.createObjectURL(blob)
    dl.download = `report_${id}.${kind}`
    dl.click()
    URL.revokeObjectURL(dl.href)
  } catch (e: any) {
    alert(e?.response?.data?.detail || `Failed to download ${kind.toUpperCase()}`)
  }
}

onMounted(load)
</script>
