import { createRouter, createWebHistory } from 'vue-router';
import Page404 from '@/pages/Page404.vue';

import TextChat from '@/pages/TextChat/Index.vue';
import TextToImg from '@/pages/TextToImg/Index.vue';
import VisionChat from '@/pages/VisionChat/Index.vue';
import PageLayout from '@/components/PageLayout.vue';
const Login = () => import('@/pages/Login/Index.vue');

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  // 登录页
  {
    path: '/login',
    component: Login,
  },
  // 系统页面
  {
    path: '/',
    component: PageLayout,
    children: [
      {
        path: '/text-chat',
        component: TextChat,
      },
      {
        path: '/vision-chat',
        component: VisionChat,
      },
      {
        path: '/text-to-img',
        component: TextToImg,
      },
    ],
  },
  // 404
  {
    path: '/:path(.*)',
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
