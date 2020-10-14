import { computed, Ref } from 'vue'
import type { RouteParams } from 'vue-router'
import type { AppRouteNames } from '../routes'

interface UseLinksProps {
  user: Ref<User | null>
}

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

export function useNavigationLinks ({ user }: UseLinksProps) {
  const username = computed(() => user.value?.username)
  const displayStatus = computed(() => username.value ? 'authorized' : 'anonym')

  const allNavLinks: NavLink[] = [
    {
      name: 'global-feed',
      title: 'Home',
      display: 'all',
    },
    {
      name: 'login',
      title: 'Sign in',
      display: 'anonym',
    },
    {
      name: 'register',
      title: 'Sign up',
      display: 'anonym',
    },
    {
      name: 'editor',
      title: 'New Post',
      display: 'authorized',
      icon: 'ion-compose',
    },
    {
      name: 'settings',
      title: 'Settings',
      display: 'authorized',
      icon: 'ion-gear-a',
    },
    {
      name: 'profile',
      params: { username: username.value },
      title: username.value || '',
      display: 'authorized',
    },
  ]

  const navLinks = computed(() => allNavLinks.filter(
    l => l.display === displayStatus.value || l.display === 'all',
  ))

  return {
    navLinks,
  }
}
