import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { hasToken } from '@/common/headerAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: () => import('../views/ScheduleView.vue'),
      meta: {
        title: 'Schedule',
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const loggedIn = hasToken()

  if (to.meta.requiresAuth && !loggedIn) {
    console.log('not logged in');
    
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    console.log('logged in');
    next('/')
  } else {
    next()
  }
})

// change html title
router.afterEach((to) => {
  document.title = `Schedule | ${to.meta.title}`
})

export default router
