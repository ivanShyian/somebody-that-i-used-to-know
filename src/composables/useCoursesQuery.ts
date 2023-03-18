import { useQuery } from 'vue-query';
import { CoursesGateway } from '@/database/courses.gateway';
import { Ref } from 'vue';
import { ICourses } from '@/types/ICourses.types';

interface ReturnType {
  isCoursesLoading: Ref<boolean>;
  isCoursesError: Ref<boolean>;
  courses: Ref<ICourses.Model[] | undefined>;
}

export function useCoursesQuery(): ReturnType {
  const { data, isLoading, isLoadingError, isError } = useQuery('courses', CoursesGateway.getCourses);

  return {
    isCoursesLoading: isLoading,
    isCoursesError: isError || isLoadingError,
    courses: data,
  }
}
