<!-- <template>
  <header class="border-b bg-white">
    <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold">
        🏨 Motel Report Dashboard
      </NuxtLink>

      <div class="flex items-center gap-3">
        <NuxtLink class="text-sm text-gray-700 hover:underline" to="/">Motels</NuxtLink>
        <button
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          @click="processEmails"
          :disabled="loading"
        >
          <span v-if="!loading">📩 Process New Emails</span>
          <span v-else>Processing…</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const api = useApi()
const loading = ref(false)

async function processEmails() {
  try {
    loading.value = true
    // hit your fetch endpoint (adjust path if needed)
    await api.get('/reports/fetch', { params: { mode: 'all', after: '2025/09/27' } })
    // A tiny UX feedback:
    alert('Fetch completed. Refresh pages to see new reports.')
  } catch (e: any) {
    alert(e?.response?.data?.detail || e?.message || 'Failed to process emails')
  } finally {
    loading.value = false
  }
}
</script> -->

<template>
  <header class="border-b bg-white relative">
    <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold">
        🏨 Motel Report Dashboard
      </NuxtLink>

      <div class="flex items-center gap-3">
        <NuxtLink class="text-sm text-gray-700 hover:underline" to="/">Motels</NuxtLink>
        <button
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          @click="processEmails"
          :disabled="loading"
        >
          <span v-if="!loading">📩 Process New Emails</span>
          <span v-else>Processing…</span>
        </button>
      </div>
    </div>

    <!-- Fullscreen Loader Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center z-50"
    >
      <div class="flex flex-col items-center text-center text-white space-y-4">
        <svg
          class="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        <p class="text-lg font-semibold">Fetching reports…</p>
        <p class="text-sm text-gray-300 max-w-sm">
          Please don’t close or refresh this tab while processing.  
          This may take a few minutes depending on Gmail sync.
        </p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const api = useApi()
const loading = ref(false)

async function processEmails() {
  try {
    loading.value = true

    const { data } = await api.get('/reports/fetch', {
      params: { mode: 'all' }
    })

    if (data?.job_id) {
      // ✅ Remote (Lambda) – Poll until completion
      await pollJobStatus(data.job_id)
      alert('✅ Fetch completed from server. Refresh to see new reports.')
    } else {
      // ✅ Local (no job_id) – assume completed
      alert('✅ Fetch completed locally.')
    }
  } catch (e: any) {
    alert(e?.response?.data?.detail || e?.message || '❌ Failed to process emails')
  } finally {
    loading.value = false
  }
}


async function pollJobStatus(jobId: string) {
  const maxAttempts = 15 // ~3 mins
  let attempts = 0
  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 20000))
    const res = await api.get(`/reports/status/${jobId}`)
    const status = res?.data?.status
    if (status === 'COMPLETED') return
    if (status === 'FAILED') throw new Error('Job failed during processing.')
    attempts++
  }
  throw new Error('Job polling timeout')
}
</script>
