<script setup lang="ts">
import type { GithubRepo } from '~/types/github'

const sentinel = ref<HTMLElement | null>(null) // 用來辨識 底部觸發 更新
const dropdown = ref<HTMLElement | null>(null)
const users: string[] = ['waittinghsu', 'yyx990803']
const open = ref(false)
const showUser = ref<string>('waittinghsu')
const repos = ref<GithubRepo[]>(Array.from({ length: 10 }).map((_, i) => {
  return {
    id: i,
    name: `GitHub Repo ${i}`,
    language: 'JavaScript',
    updated_at: '2023-09-01T12:00:00Z',
    stargazers_count: 2,
    description: `omega ${i}`,
    fork: false,
  } as GithubRepo
}))
const avatar = computed(() => {
  return `https://github.com/${showUser.value}.png`
})
function setUser(name: string) {
  showUser.value = name
  open.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header>
      <div class="bg-white border-1 border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <div class="flex items-center gap-3 relative">
            <img :src="avatar" :alt="showUser" class="w-10 h-10 rounded-full" @click="open = !open">
            <div v-show="open" ref="dropdown" class="absolute top-full left-0 mt-1 w-48 bg-gray-100 rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
              <div v-for="item in users" :key="item" class="px-4 py-2.5 hover:bg-gray-300 cursor-pointer" @click="setUser(item)">
                選項 {{ item }}
              </div>
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900">
                {{ showUser }}的 GitHub Repos
              </h1>
              <p class="text-xs text-gray-500">
                測試無限滾動載入
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Repo List -->
    <main class="max-w-3xl mx-auto px-4 py-6">
      <div class="flex flex-col gap-3">
        <RepoCard
          v-for="repo in repos"
          :key="repo.id"
          :repo="repo"
        />
      </div>
      {{ avatar }}
    </main>
  </div>
</template>
