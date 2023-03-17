import { useQuery, useQueryClient } from 'vue-query'
import { CoursesGateway } from '@/database/courses.gateway';
import { useCoursesQuery } from '@/composables/useCoursesQuery';

export function useCourseQuery(slug: string) {
  const queryClient = useQueryClient()
  const { courses: unused } = useCoursesQuery()

  const { data, isLoading } = useQuery(
    ['course', slug],
    async () => {
      const fetchedCourses = await queryClient.getQueryData('courses') as any;
      const course = fetchedCourses.find((course: any) => course.meta.slug === slug);
      if (!course) {
        throw new Error('Course not found');
      }
      return CoursesGateway.getCourseById(course.id);
    },
  )

  return {
    isCourseLoading: isLoading,
    course: data,
  }
}
