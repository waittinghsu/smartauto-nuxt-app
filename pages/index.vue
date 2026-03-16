<script setup lang="ts">
const sentinel = ref<HTMLElement | null>(null) // 用來辨識 底部觸發 更新
const dropdown = ref<HTMLElement | null>(null)
const users: string[] = ['waittinghsu', 'yyx990803']
const open = ref(false)
const showUser = ref<string>('waittinghsu')

const { repos, loadMore } = useGithubRepos(showUser)

const avatar = computed(() => {
  return `https://github.com/${showUser.value}.png`
})
function setUser(name: string) {
  showUser.value = name
  open.value = false
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  loadMore()
  // 監控
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting)
      loadMore()
  })

  // 開始觀察 sentinel
  if (sentinel.value)
    observer.observe(sentinel.value)
})
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
      <!-- Sentinel -->
      <div ref="sentinel" class="h-1" />
    </main>
  </div>
</template>
