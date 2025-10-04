<template>
  <div class="min-h-screen bg-gray-100">
    <HeaderNav />
    <main class="mx-auto max-w-6xl p-4">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '~/components/HeaderNav.vue'
</script>
