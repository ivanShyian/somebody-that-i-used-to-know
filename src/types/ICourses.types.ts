export namespace ICourses {
  export interface Model {
    id: string;
    title: string;
    tags: string[];
    launchDate: Date;
    status: string;
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: string;
    rating: number;
    meta: Meta;
  }

  export interface Meta {
    slug: string;
    skills: string[];
    courseVideoPreview: CourseVideoPreview;
  }

  export interface CourseVideoPreview {
    link: string;
    duration: number;
    previewImageLink: string;
  }
}
