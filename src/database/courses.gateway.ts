import { axios } from '@/api/axios';
import { ICoursesGatewayTypes } from '@/database/courses.gateway.types';

async function getCourses(): ICoursesGatewayTypes.GetCourses.ReturnType {
  try {
    const { data } = await axios.get<
      ICoursesGatewayTypes.GetCourses.Response
    >('/core/preview-courses');

    return data.courses;
  } catch(error) {
    console.error(error)
  }
}
async function getCourseById(courseId: string): ICoursesGatewayTypes.GetCourse.ReturnType {
  try {
    const { data: course } = await axios.get<
      ICoursesGatewayTypes.GetCourse.Response
    >(`/core/preview-courses/${courseId}`);

    return course;
  } catch(error) {
    console.error(error)
  }
}

export const CoursesGateway = {
  getCourses,
  getCourseById,
};
