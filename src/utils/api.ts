import type { Course } from '@/types/course';
import type { User, UserWithoutPassword } from '@/types/userSchema';
import randomSuccess from './randomSuccess';
import sleep from './sleep';

export const authenticate = async (user: User): Promise<UserWithoutPassword> => {
  await sleep(1000);

  if (randomSuccess()) {
    return { email: user.email };
  } else {
    throw Error('Failed to authenticate');
  }
};

export const getCourses = async (): Promise<Course[]> => {
  await sleep(1000);

  const { courses } = await import('./mockCourses');
  return courses;
};

export const buyCourse = async (course: Course): Promise<Course> => {
  await sleep(1000);

  if (randomSuccess()) {
    return course;
  } else {
    throw Error('Failed to buy the course');
  }
};
