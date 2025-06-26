// app/hooks/useMPHDevice.ts
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase/config';
import useMPHStore from '../store/useMPHStore';

const useMPHDevice = (deviceId: string) => {
  const setDeviceState = useMPHStore(state => state.setDeviceState);

  useEffect(() => {
    if (!deviceId) return;

    const unsub = onSnapshot(doc(db, 'MPHDevices', deviceId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDeviceState(data);
      }
    });

    return () => unsub();
  }, [deviceId]);
};

export default useMPHDevice;
