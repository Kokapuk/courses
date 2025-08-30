import type { Course } from '@/types/course';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CoursesState {
  courses: Course[] | null;
  purchasedCoursesIds: string[];
  isVideoModalOpen: boolean;
  videoCourseId: string | null;
  savedVideosPositions: Record<string, number>;
}

const initialState: CoursesState = {
  courses: null,
  purchasedCoursesIds: [],
  isVideoModalOpen: false,
  videoCourseId: null,
  savedVideosPositions: {},
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addPurchasedCourse: (state, action: PayloadAction<Course>) => {
      state.purchasedCoursesIds.push(action.payload.id);
    },
    resetPurchasedCourse: (state) => {
      state.purchasedCoursesIds = [];
    },
    setVideoModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isVideoModalOpen = action.payload;
    },
    setVideoCourseId: (state, action: PayloadAction<string>) => {
      state.videoCourseId = action.payload;
    },
    saveVideoPosition: (state, action: PayloadAction<{ courseId: string; position: number }>) => {
      state.savedVideosPositions[action.payload.courseId] = action.payload.position;
    },
    resetSavedVideosPositions: (state) => {
      state.savedVideosPositions = {};
    },
  },
});

export const {
  setCourses,
  addPurchasedCourse,
  resetPurchasedCourse,
  setVideoModalOpen,
  setVideoCourseId,
  saveVideoPosition,
  resetSavedVideosPositions,
} = coursesSlice.actions;

export default coursesSlice.reducer;
