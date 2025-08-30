import type { RootState } from '@/app/store';
import { Grid, type GridProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CourseCard from './CourseCard';

export default function CourseList(props: GridProps) {
  const courses = useSelector((state: RootState) => state.courses.courses);

  if (!courses) {
    return null;
  }

  return (
    <Grid templateColumns={{ lg: 'repeat(2, 1fr)', base: 'repeat(1, 1fr)' }} gap="10" {...props}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Grid>
  );
}
