/**
 * 같은 단어 하이라이트 표시
 * @param {string} str 찾아야 하는 단어
 * @param {string} pos 단어를 추려낼 내용
 * @returns 하이라이트 CSS를 적용시킨 요소
 */
export const sameString = (str: string, pos: string) => {
  /* 정확히 일치하는 요소만 하이라이트 */
  // const firstIdx1 = pos.indexOf(str);
  // const lastIdx2 = pos.indexOf(str);

  // if (firstIdx1 === -1 && lastIdx2 === -1) return pos;

  // const first = pos.slice(0, firstIdx1);
  // const last = pos.slice(lastIdx2 + str.length);

  // return (
  //   <>
  //     {first}
  //     <span className='text-primary-500'>{str}</span>
  //     {last}
  //   </>
  // );

  /* 엄한 버전 */
  const posList = pos.split('');

  const result = posList.map((item, idx) =>
    item === ' ' ? (
      ' '
    ) : str.split('').includes(item) ? (
      <span key={idx} className='text-primary-500'>
        {item}
      </span>
    ) : (
      item
    ),
  );

  return result;
};
