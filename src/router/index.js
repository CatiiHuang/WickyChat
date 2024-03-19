import { createRouter, createWebHistory } from 'vue-router';
import Page404 from '@/pages/Page404.vue';

import TextChat from '@/pages/TextChat/Index.vue';
import TextToImg from '@/pages/TextToImg/Index.vue';
import VisionChat from '@/pages/VisionChat/Index.vue';

const routes = [
  {
    path: '/',
    redirect: '/TextChat',
  },

  {
    path: '/TextChat',
    component: TextChat,
  },
  {
    path: '/TextToImg',
    component: TextToImg,
  },
  {
    path: '/VisionChat',
    component: VisionChat,
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
