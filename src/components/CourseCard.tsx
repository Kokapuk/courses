import { setVideoCourseId, setVideoModalOpen } from '@/app/features/courses/coursesSlice';
import type { RootState } from '@/app/store';
import type { Course } from '@/types/course';
import { Button, Card, type CardRootProps } from '@chakra-ui/react';
import type { RefAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyCourseButton from './BuyCourseButton';

export type CourseCardProps = { course: Course } & CardRootProps;

export default function CourseCard({ course, ...props }: CourseCardProps & RefAttributes<HTMLDivElement>) {
  const isCoursePurchasedCourse = useSelector((state: RootState) =>
    state.courses.purchasedCoursesIds.includes(course.id)
  );
  const dispatch = useDispatch();

  return (
    <Card.Root {...props}>
      <Card.Header>
        <Card.Title mt="2">{course.title}</Card.Title>
        <Card.Description>{course.description}</Card.Description>
      </Card.Header>

      <Card.Footer justifyContent="flex-end" marginTop="4">
        {isCoursePurchasedCourse ? (
          <Button
            onClick={() => {
              dispatch(setVideoCourseId(course.id));
              dispatch(setVideoModalOpen(true));
            }}
            variant="subtle"
          >
            Watch
          </Button>
        ) : (
          <BuyCourseButton course={course} />
        )}
      </Card.Footer>
    </Card.Root>
  );
}
