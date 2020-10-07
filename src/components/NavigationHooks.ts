import { computed, Ref } from 'vue'

interface UseLinksProps {
  isUserAuthorized: Ref<boolean>
}

interface NavLink {
  to: string
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

export function useNavigationLinks ({ isUserAuthorized }: UseLinksProps) {
  const displayStatus = computed(() => isUserAuthorized.value ? 'anonym' : 'authorized')

  const allNavLinks: NavLink[] = [
    { to: '/', title: 'Home', display: 'all' },
    { to: '/login', title: 'Sign in', display: 'anonym' },
    { to: '/register', title: 'Sign up', display: 'anonym' },
    { to: '/editor', title: 'New Post', display: 'authorized', icon: 'ion-compose' },
    { to: '/settings', title: 'Settings', display: 'authorized', icon: 'ion-gear-a' },
    { to: '/@USERNAME', title: 'USERNAME', display: 'authorized' },
  ]

  const navLinks = computed(() => allNavLinks.filter(
    l => l.display === displayStatus.value || l.display === 'all',
  ))

  return {
    navLinks,
  }
}
