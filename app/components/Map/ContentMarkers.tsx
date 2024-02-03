'use client';
import { useMapContents } from '@/hooks/useGetContent';
import CustomPin from './CustomPin';
import { Coordinates } from '@/hooks/useGeolocation';

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
    data.items.map(({ contentId, lat, lng }: any) => (
      <CustomPin
        key={contentId}
        isSelected={contentId === isSelected}
        position={{ lat: lat, lng: lng }}
        onClick={() =>
          onClick({
            id: contentId,
            position: { lat: lat, lng: lng },
            level: 3,
          })
        }
      />
    ))
  );
};

export default ContentMarkers;
