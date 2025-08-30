import { setCourses } from '@/app/features/courses/coursesSlice';
import CourseList from '@/components/CourseList';
import VideoModal from '@/components/VideoModal';
import type { Course } from '@/types/course';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router';

export default function Courses() {
  const courses = useLoaderData<Course[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourses(courses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CourseList />
      <VideoModal />
    </>
  );
}
