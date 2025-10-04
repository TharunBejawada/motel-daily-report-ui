<template>
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
</script>
