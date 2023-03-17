import { axios } from '@/api/axios';

async function getCourses() {
  try {
    const { data } = await axios.get('/core/preview-courses');
    return data.courses;
  } catch(error) {
    console.error(error)
  }
}
async function getCourseById(courseId: string) {
  try {
    const { data: course } = await axios.get(`/core/preview-courses/${courseId}`);
    return course;
  } catch(error) {
    console.error(error)
  }
}

export const CoursesGateway = {
  getCourses,
  getCourseById,
};
