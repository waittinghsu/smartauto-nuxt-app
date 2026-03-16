import type { GithubRepo } from '~/types/github'

export function useGithubRepos(username: Ref<string>) {
  const store = useGithubReposStore()
  const state = computed(() => store.getOrInit(username.value))
  const config = useRuntimeConfig()

  // 取更多
  async function loadMore() {
    const userReposCache = store.cache[username.value]
    if (userReposCache.loading || !userReposCache.hasMore)
      return

    userReposCache.loading = true
    userReposCache.error = null

    try {
      const requestData = {
        params: {
          page: userReposCache.page,
          per_page: 10,
          sort: 'updated',
          type: 'public',
        },
      }
      config.public.githubToken && Object.assign(requestData, { headers: {
        Authorization: `Bearer ${config.public.githubToken}`,
      } })
      const data = await $fetch<GithubRepo[]>(
        `https://api.github.com/users/${username.value}/repos`,
        { ...requestData },
      )
      if (data.length < 10)// 假設數量少於 10 表示沒有下一頁了
        userReposCache.hasMore = false

      userReposCache.repos.push(...data)
      userReposCache.page++
    }
    catch {
      userReposCache.error = '載入失敗，請稍後再試'
    }
    finally {
      userReposCache.loading = false
    }
  }

  return {
    repos: computed(() => state.value.repos),
    hasMore: computed(() => state.value.hasMore),
    loadMore,
  }
}
