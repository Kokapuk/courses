import { setVideoModalOpen } from '@/app/features/courses/coursesSlice';
import type { RootState } from '@/app/store';
import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CourseVideo from './CourseVideo';

export default function VideoModal() {
  const { courses, isVideoModalOpen, videoCourseId } = useSelector(
    (state: RootState) => ({
      courses: state.courses.courses,
      isVideoModalOpen: state.courses.isVideoModalOpen,
      videoCourseId: state.courses.videoCourseId,
    }),
    shallowEqual
  );
  const activeVideoCourse = useMemo(
    () => courses?.find((course) => course.id === videoCourseId),
    [courses, videoCourseId]
  );
  const dispatch = useDispatch();

  if (!activeVideoCourse) {
    return null;
  }

  return (
    <Dialog.Root
      open={isVideoModalOpen}
      onOpenChange={(e) => dispatch(setVideoModalOpen(e.open))}
      size="cover"
      placement="center"
      motionPreset="scale"
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{activeVideoCourse?.title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body height="100%" minHeight="0">
              <CourseVideo style={{ width: '100%', height: '100%', backgroundColor: 'black' }} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
