import returnFetch from 'return-fetch';

const base =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_DEV_SERVER_URL;

/**
 * baseUrl, headers 추가하여 확장된 fetch
 */
const fetchExtended = returnFetch({
  baseUrl: base,
});

export default fetchExtended;
