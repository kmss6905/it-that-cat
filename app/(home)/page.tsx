'use client';
import useGeolocation from '@/hooks/useGeolocation';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import useAddress from '@/hooks/useAddress';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import MapComponent from '@/components/Map/Map';
import CustomPin from '@/components/Map/CustomPin';
import CurrPin from '@/components/Map/CurrPin';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';
import PostSkeleton from '@/components/Home/PostSkeleton';
export default function Home() {
  useKakaoLoader();
  const geolocation = useGeolocation();

  const initAddress = useAddress();
  const [address, setAddress] = useState<undefined | RegionState>();
  const [selected, setSelected] = useState<number | null>(null);

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  } | null>(null);

  const pinList = [
    { id: 0, lat: 35.17183079055732, lng: 129.0556621326331 },
    { id: 1, lat: 35.1716984775722, lng: 129.05708553844048 },
    { id: 2, lat: 35.17275369644841, lng: 129.05557562177881 },
    { id: 3, lat: 35.171488702430636, lng: 129.0561720817253 },
  ];

  if (geolocation.position === null) return null;
  const handleChangeCenter = async (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const latlng = map.getCenter();

    const position = { lat: latlng.getLat(), lng: latlng.getLng() };

    setData({
      level: level,
      position: position,
    });

    const addr = await getAddress(position);

    setAddress(addr);
  };

  const handleClickCurrentPosition = () => {
    if (data === null || geolocation.position === null) return null;

    setData({
      level: data?.level,
      position: {
        lat: geolocation.position?.lat,
        lng: geolocation.position?.lng,
      },
    });
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <MapComponent
        onCenterChanged={handleChangeCenter}
        position={data?.position}
        isPanto
        level={3}
      >
        {pinList.map(
          (position) =>
            data &&
            data.position !== position && (
              <div className='bg-gray-500' key={position.id}>
                <CustomPin
                  isSelected={position.id === selected}
                  position={position}
                  onClick={() => {
                    setData({ level: 1, position: position });
                    setSelected(position.id);
                  }}
                />
              </div>
            ),
        )}
        <CurrPin position={geolocation.position} />
      </MapComponent>

      <div className='absolute bottom-10 px-6 z-20 w-full'>
        <CurrentLocationBtn handleClick={handleClickCurrentPosition} />
        <div className='bg-white rounded-xl w-full h-[150px] shadow-[0_0_12px_0_rgba(0,0,0,0.20)]'>
          <PostSkeleton />
        </div>
      </div>
    </div>
  );
}
