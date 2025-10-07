<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/HeaderNav.vue'
</script>
