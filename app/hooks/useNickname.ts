import { getNickname } from '@/apis/mypage';
import { queryNicknameKey } from '@/constants/queryKey';
import { useQuery } from 'react-query';

const useNickname = () => {
  return useQuery({
    queryKey: [queryNicknameKey],
    queryFn: () => getNickname(),
  });
};

export default useNickname;
