import type { Course } from '@/types/course';
import { Grid, type GridProps } from '@chakra-ui/react';
import CourseCard from './CourseCard';

export type CourseListProps = { courses: Course[] } & GridProps;

export default function CourseList({ courses, ...props }: CourseListProps) {
  return (
    <Grid templateColumns={{ lg: 'repeat(2, 1fr)', base: 'repeat(1, 1fr)' }} gap="10" {...props}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Grid>
  );
}
