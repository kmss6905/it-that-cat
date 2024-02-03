import { Coordinates } from '@/types/address';

export const getDistance = (start: Coordinates, end: Coordinates) => {
  const startLatLng = new kakao.maps.LatLng(start.lat, start.lng);
  const endLatLng = new kakao.maps.LatLng(end.lat, end.lng);

  const poly = new kakao.maps.Polyline({ path: [startLatLng, endLatLng] });
  const distance = poly.getLength();

  return Math.floor(distance);
};
