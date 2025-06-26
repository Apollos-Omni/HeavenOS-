// app/store/useMPHStore.ts
import { create } from 'zustand';

type MPHState = {
  hingeLocked: boolean;
  childLockEnabled: boolean;
  doorOpen: boolean;
  setDeviceState: (data: Partial<MPHState>) => void;
};

const useMPHStore = create<MPHState>((set) => ({
  hingeLocked: false,
  childLockEnabled: false,
  doorOpen: false,
  setDeviceState: (data) => set(state => ({ ...state, ...data })),
}));

export default useMPHStore;
