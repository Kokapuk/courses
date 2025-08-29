import type { UserWithoutPassword } from '@/types/userSchema';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: UserWithoutPassword | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('auth') ?? 'null'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedAs: (state, action: PayloadAction<UserWithoutPassword | null>) => {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem('auth', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('auth');
      }
    },
  },
});

export const { setAuthenticatedAs } = authSlice.actions;

export default authSlice.reducer;
