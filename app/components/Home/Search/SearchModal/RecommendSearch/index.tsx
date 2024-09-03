import React, { Fragment } from 'react';

import { QueryState } from '..';
import IconGraySearchM from '@/assets/images/icon_graySearchM.svg';
import { highlight } from '@/utils/highlight';
import { AdmAddrData } from '@/utils/getAdmAddr';

const RecommendSearch = ({
  query,
  handleClickRecommend,
}: {
  query: QueryState;
  handleClickRecommend: (place: AdmAddrData) => void;
}) => {
  return (
    <Fragment>
      {query.data?.length > 0 && (
        <ul className='px-6 py-5 flex flex-col gap-1 h-[calc(100%-128px)] overflow-y-scroll layout'>
          {query.data.map((place) => (
            <li
              key={place.fullAddr}
              onClick={() => handleClickRecommend(place)}
              className='flex justify-between items-center gap-[10px] text-gray-500 cursor-pointer'
            >
              <IconGraySearchM />
              <span className='flex-grow py-[3px]'>
                {highlight(query.key, place.fullAddr)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default RecommendSearch;
