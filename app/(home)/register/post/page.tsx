'use client';
import { useGeolocationStore } from '@/stores/register/store';
import { Fragment } from 'react';

const RegisterPostPage = () => {
  const { geolocation } = useGeolocationStore();
  console.log('🚀 ~ RegisterPostPage ~ geolocation:', geolocation);
  return <Fragment></Fragment>;
};

export default RegisterPostPage;
