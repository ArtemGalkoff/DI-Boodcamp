import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerPushSubscription } from '../slices/pushSlice';

const PushManager = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?.id); 

  useEffect(() => {
  console.log('userId in PushManager:', userId);
  if (userId) {
    dispatch(registerPushSubscription(userId));
  }
}, [dispatch, userId]);

  return null; 
};

export default PushManager;

