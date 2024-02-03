export interface ResType<T> {
  result: 'ERROR' | 'SUCCESS';
  error?: {
    code: string;
    message: string;
  };
  data: T;
}
