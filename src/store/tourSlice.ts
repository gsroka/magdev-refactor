import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TourState {
  currentStep: number;
  isActive: boolean;
}

const initialState: TourState = {
  currentStep: 0,
  isActive: false,
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    startTour: (state) => {
      state.currentStep = 0;
      state.isActive = true;
    },
    endTour: (state) => {
      state.isActive = false;
      state.currentStep = 0;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
  },
});

export const { startTour, endTour, setCurrentStep, nextStep, prevStep } = tourSlice.actions;
export default tourSlice.reducer;
