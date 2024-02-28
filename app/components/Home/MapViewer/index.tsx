import getAddress from '@/apis/map/getAddress';
import getSelectContent from '@/apis/map/getSelectContent';
import CustomPin from '@/components/Map/CustomPin';
import MapComponent from '@/components/Map/Map';
import useGeolocation from '@/hooks/useGeolocation';
import { useMapContents } from '@/hooks/useGetContent';
import { useGeolocationStore } from '@/stores/home/store';
import { RegionState } from '@/types/address';
import { ContentObjProps } from '@/types/content';
import { useCallback } from 'react';

interface MapViewerProps {
  selectedPin: number | null;
  setSelectedPin: (value: number | null) => void;
  catMark: boolean;
  setContent: (value: ContentObjProps | null) => void;
}

const MapViewer = ({
  selectedPin,
  setSelectedPin,
  catMark,
  setContent,
}: MapViewerProps) => {
  const currentPosition = useGeolocation();

  const { geolocation, setLevel, setAddress, setPosition } =
    useGeolocationStore();

  const query = {
    position: currentPosition.position,
    level: geolocation.level,
    follow: catMark,
  };

  const { data } = useMapContents({ ...query });

  const handleClickMarker = async (data: any) => {
    setLevel(3);
    setPosition(data.position);
    setSelectedPin(data.id);

    /* 선택한 컨텐츠 내용 가져오기 */
    const content = await getSelectContent(data.id);
    setContent(content);
  };

  return (
    <MapComponent
      isPanto
      level={geolocation.level}
      onClick={() => setSelectedPin(null)}
    >
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
