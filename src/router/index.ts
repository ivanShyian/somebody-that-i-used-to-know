import { createRouter, createWebHistory } from 'vue-router';
import { getLocalAccessToken, setLocalAccessToken, signIn } from '@/utils/auth';

import PageCourses from '@/views/PageCourses.vue';
import PageCourse from '@/views/PageCourse.vue';
import PageLesson from '@/views/PageLesson.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "courses",
      component: PageCourses,
    },
    {
      path: '/:slug',
      name: 'course',
      component: PageCourse,
    },
    {
      path: '/:slug/:lessonNumber',
      name: 'lesson',
      component: PageLesson,
    }
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
