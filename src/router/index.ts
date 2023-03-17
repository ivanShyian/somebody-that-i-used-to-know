import { createRouter, createWebHistory } from 'vue-router';
import { getLocalAccessToken, setLocalAccessToken, signIn } from '@/api/auth';

import Courses from '@/views/Courses.vue';
import Course from '@/views/Course.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "courses",
      component: Courses,
    },
    {
      path: '/:slug',
      name: "course",
      component: Course,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = getLocalAccessToken()

  if (!loggedIn) {
    const token = await signIn()
    setLocalAccessToken(token)
  }
  next();
})

export default router;
