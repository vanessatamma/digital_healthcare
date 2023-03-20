import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/init";
import type {IUser} from "@/interfaces/user.interfaces";
import {useAuthStore} from "@/stores/auth";


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
  return new Promise(( resolve, reject ) =>{
    const removeListener = onAuthStateChanged(
        getAuth(),
        async (user) => {
          //console.log('getCurrentUser', user)
          if(user) {
            console.log('getCurrentUser', user)
            const userSnap = await getDoc(doc(db, "users", (user as any).uid));
            if (userSnap.exists()) {
              const userAuth = useAuthStore()
              userAuth.user = {
                ...userSnap.data() as IUser,
                confirmPassword: undefined,
                password: undefined,
                lastLogin: (user.metadata as any).lastLoginAt
              };
            }
          }

          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

router.beforeEach( async (to, from, next) => {
  //console.log("B-E")
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()){
      next();
    } else {
      console.log("Non hai i permessi di accesso.");
      next('/login');
    }
  } else {
    next();
  }
});

export default router
