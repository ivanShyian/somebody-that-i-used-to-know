import { useQuery, useQueryClient } from 'vue-query'
import { CoursesGateway } from '@/database/courses.gateway';
import { useCoursesQuery } from '@/composables/useCoursesQuery';
import { ICoursesGatewayTypes } from '@/database/courses.gateway.types';
import { ICourse } from '@/types/ICourse.types';
import { Ref } from 'vue';

interface ReturnType {
  isCourseLoading: Ref<boolean>;
  isCourseError: Ref<boolean>;
  course: Ref<ICourse.Model | undefined>;
}

export function useCourseQuery(slug: string): ReturnType {
  const queryClient = useQueryClient()
  const { courses: UNUSED } = useCoursesQuery()

  const { data, isLoading, isError, isLoadingError } = useQuery(
    ['course', slug],
    async () => {
      const fetchedCourses = await queryClient.getQueryData<
        ICoursesGatewayTypes.GetCourses.ReturnType
      >('courses');

      if (!fetchedCourses) throw new Error('Courses not found');

      const course = fetchedCourses.find((course) => course.meta.slug === slug);

      if (!course) throw new Error('Course not found');

      return CoursesGateway.getCourseById(course.id);
    },
  )

  return {
    isCourseLoading: isLoading,
    isCourseError: isError || isLoadingError,
    course: data,
  }
}
