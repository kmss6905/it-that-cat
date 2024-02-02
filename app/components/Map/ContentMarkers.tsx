'use client';
import { useMapContents } from '@/hooks/useGetContent';
import CustomPin from './CustomPin';
import { Coordinates } from '@/hooks/useGeolocation';
import Link from 'next/link';

interface ContentMarkers {
  query: {
    position: Coordinates;
    level?: number | undefined;
    follow: boolean;
  };
  isSelected: number | null;
  onClick: (value: any) => void;
}

const ContentMarkers = ({ query, isSelected, onClick }: ContentMarkers) => {
  const { data } = useMapContents({ ...query });
  return (
    data &&
    data.items.map(({ catContentId, catLat, catLon }: any) => (
      <Link key={catContentId} href={`/cat/${catContentId}`}>
        <CustomPin
          isSelected={catContentId === isSelected}
          position={{ lat: catLat, lng: catLon }}
          onClick={() =>
            onClick({
              id: catContentId,
              position: { lat: catLat, lng: catLon },
              level: 3,
            })
          }
        />
      </Link>
    ))
  );
};

export default ContentMarkers;
