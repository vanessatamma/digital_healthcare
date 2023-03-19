import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: 'About',
      component: () => import("../views/About.vue"),
      meta: { requiresAuth: true }
    },
  ]
})

const getCurrentUser = () => {
  console.log('getCurrentUser')
  return new Promise(( resolve, reject ) =>{
    const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

router.beforeEach( async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()){
      next();
    } else {
      alert("Non hai i permessi di accesso.");
      next('/login');
    }
  } else {
    next();
  }
});

export default router
