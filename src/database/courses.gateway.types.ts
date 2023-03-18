import { ICourses } from '@/types/ICourses.types';
import { ICourse } from '@/types/ICourse.types';

export namespace ICoursesGatewayTypes {
  export namespace GetCourses {
    export type ReturnType = Promise<ICourses.Model[] | undefined>;
    export type Response = { courses: ICourses.Model[] };
  }
  export namespace GetCourse {
    export type ReturnType = Promise<ICourse.Model | undefined>;
    export type Response = ICourse.Model;
  }
}
