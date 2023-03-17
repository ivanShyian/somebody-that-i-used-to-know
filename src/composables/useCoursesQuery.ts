import { useQuery } from 'vue-query';
import { CoursesGateway } from '@/database/courses.gateway';

export function useCoursesQuery() {
  const { data, isLoading } = useQuery('courses', CoursesGateway.getCourses);

  return {
    isCoursesLoading: isLoading,
    courses: data,
  }
}
