import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
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
    console.log('sei quiii beforeEach')
    if (await getCurrentUser()){
      next();
    } else {
      alert("Non hai i permessi di accesso.");
      next('/');
    }
  } else {
    next();
  }
});

export default router
