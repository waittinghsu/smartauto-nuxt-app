<script setup lang="ts">
import type { GithubRepo } from '~/types/github'

defineProps<{
  repo: GithubRepo
}>()
</script>

<template>
  <!-- 名字 星星數量  說明 更新時間 使用語言 repo網址 -->
  <a
    target="_blank"
    rel="noopener noreferrer"
    class="block bg-pink-50 rounded-xl border-solid border-pink-200 p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 no-underline cursor-pointer"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-base font-semibold text-blue-600 hover:text-blue-700 truncate uppercase">
        {{ repo?.name || 'waittinghsu' }}
      </h3>
      <div class="flex items-center gap-1 text-amber-500 text-sm shrink-0">
        <span>★</span>
        <span>{{ repo?.stargazers_count?.toLocaleString() || 0 }}</span>
      </div>
    </div>

    <p class="mt-2 text-sm text-gray-500 line-clamp-2 min-h-10">
      {{ repo?.description || '（無說明）' }}
    </p>

    <div class="mt-3 flex items-center gap-3 text-xs text-gray-400">
      <span v-if="repo.language" class="flex items-center gap-1">
        <span class="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
        {{ repo?.language }}
      </span>
      <span v-if="repo.updated_at">更新於 {{ new Date(repo.updated_at)?.toLocaleDateString('zh-TW') }}</span>
    </div>
  </a>
</template>
