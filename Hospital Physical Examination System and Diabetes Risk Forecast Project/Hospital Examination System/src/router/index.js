import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import users from '../components/users.vue'
import patientinfo from '../components/patientinfo.vue'
import doctorinfo from '../components/doctorinfo.vue'
import appointments from '../components/appointments.vue'
import bloodroutine from '../components/bloodroutine.vue'
import liver from '../components/liver.vue'
import renin from '../components/renin.vue'
import diagnosis from '../components/diagnosis.vue'
import result from '../components/result.vue'
import Login from "@/views/Login" //登陆
import Register from "@/views/Register"; //注册
import forecast from "../components/forecast"

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/appointments',
        name: 'appointments',
        component: appointments
      },{
        path: '/bloodroutine',
        name: 'bloodroutine',
        component: bloodroutine
      },{
        path: '/users',
        name: 'users',
        component: users
      },{
        path: '/patientinfo',
        name: 'patientinfo',
        component: patientinfo
      },
      {
        path: '/doctorinfo',
        name: 'doctorinfo',
        component: doctorinfo
      },
      {
        path: '/liver',
        name: 'liver',
        component: liver
      },
      {
        path: '/renin',
        name: 'renin',
        component: renin
      },
      {
        path: '/diagnosis',
        name: 'diagnosis',
        component: diagnosis
      },
      {
        path: '/result',
        name: 'result',
        component: result
      },
      {
        path: '/forecast',
        name: 'forecast',
        component: forecast
      }
    ]
  },
  
  
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = true;/* 判断用户是否已登录 */
  
//     if (to.name !== 'Login' && !isAuthenticated) {
//       next({ name: 'Login' });
//       isAuthenticated = true;
//     } else if (to.name == 'Login' && isAuthenticated) {
//       next({ name: 'Home' });
//     } else {
//       next();
//     }
// });


export default router
