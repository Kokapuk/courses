import { addPurchasedCourse } from '@/app/features/courses/coursesSlice';
import type { Course } from '@/types/course';
import { toaster } from '@/ui/toaster';
import { buyCourse } from '@/utils/api';
import { Button, FormatNumber, type ButtonProps } from '@chakra-ui/react';
import { useState, type RefAttributes } from 'react';
import { useDispatch } from 'react-redux';
import AuthRequiredAction from './AuthRequiredAction';

export type BuyCourseButtonProps = { course: Course } & ButtonProps;

export default function BuyCourseButton({
  course,
  onClick,
  ...props
}: BuyCourseButtonProps & RefAttributes<HTMLButtonElement>) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    try {
      setLoading(true);

      const purchasedCourse = await buyCourse(course);
      dispatch(addPurchasedCourse(purchasedCourse));
      toaster.create({
        title: 'Success',
        description: 'Successfully purchased the course',
        closable: true,
        type: 'success',
      });
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        if (err instanceof Error) {
          toaster.create({ title: 'Error', description: err.message, closable: true, type: 'error' });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRequiredAction>
      <Button onClick={handleClick} loading={isLoading} {...props}>
        Buy <FormatNumber value={course.price} style="currency" currency="USD" />
      </Button>
    </AuthRequiredAction>
  );
}
