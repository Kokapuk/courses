import { saveVideoPosition } from '@/app/features/courses/coursesSlice';
import type { RootState } from '@/app/store';
import { useEffect, useMemo, useRef, type DetailedHTMLProps, type VideoHTMLAttributes } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function CourseVideo(props: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>) {
  const videoElement = useRef<HTMLVideoElement>(null);
  const { courses, videoCourseId, savedVideosPositions } = useSelector(
    (state: RootState) => ({
      courses: state.courses.courses,
      videoCourseId: state.courses.videoCourseId,
      savedVideosPositions: state.courses.savedVideosPositions,
    }),
    shallowEqual
  );
  const activeVideo = useMemo(() => courses?.find((course) => course.id === videoCourseId), [courses, videoCourseId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoElement.current || !videoCourseId) {
      return;
    }

    const video = videoElement.current;
    video.currentTime = savedVideosPositions[videoCourseId] ?? 0;

    return () => {
      dispatch(
        saveVideoPosition({
          courseId: videoCourseId,
          position: video.currentTime === video.duration ? 0 : video.currentTime,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <video ref={videoElement} src={activeVideo!.videoUrl} controls autoPlay {...props} />;
}
