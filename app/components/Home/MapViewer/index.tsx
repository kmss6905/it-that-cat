import { useRef } from 'react';

import { getContent } from '@/apis/contents';
import CustomPin from '@/components/Map/CustomPin';
import MapComponent from '@/components/Map/Map';
import useGeolocation from '@/hooks/useGeolocation';
import { useMapContents } from '@/hooks/queries/useGetContent';
import { useGeolocationStore } from '@/stores/home/store';
import { Coordinates } from '@/types/address';
import { ContentObjProps } from '@/types/content';

interface MapViewerProps {
  catMark: boolean;
  selectedPin: number | null;
  setSelectedPin: (value: number | null) => void;
  setContent: (value: ContentObjProps | null) => void;
}

const MapViewer = ({
  selectedPin,
  setSelectedPin,
  catMark,
  setContent,
}: MapViewerProps) => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const currentPosition = useGeolocation();
  const { setPosition } = useGeolocationStore();

  const { data } = useMapContents({
    position: currentPosition.position,
    follow: catMark,
  });

  const handleClickMarker = async (data: {
    id: number;
    position: Coordinates;
  }) => {
    // macker 클릭할 때마다 확대
    const map = mapRef.current;
    if (!map) {
      return;
    }
    map.setLevel(3);

    setPosition(data.position);
    setSelectedPin(data.id);

    /* 선택한 컨텐츠 내용 가져오기 */
    const content = (await getContent(String(data.id))).data;
    setContent(content);
  };

  return (
    <MapComponent isPanto onClick={() => setSelectedPin(null)} mapRef={mapRef}>
      {data
        ? data.items.map(({ contentId, lat, lng }: any) => (
            <CustomPin
              key={contentId}
              isSelected={contentId === selectedPin}
              position={{ lat: lat, lng: lng }}
              onClick={() =>
                handleClickMarker({
                  id: contentId,
                  position: { lat: lat, lng: lng },
                })
              }
            />
          ))
        : null}
    </MapComponent>
  );
};

export default MapViewer;
