'use client';
import CustomPin from './CustomPin';
import { useMapContents } from '@/hooks/useGetContent';
import { Coordinates } from '@/types/address';

interface ContentMarkers {
  query: {
    position: Coordinates | null;
    level?: number | undefined;
    follow: boolean;
  };
  isSelected?: number | null;
  onClick?: (value: any) => void;
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
          onClick &&
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
