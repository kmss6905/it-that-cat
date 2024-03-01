export interface ResType<T> {
  result: 'ERROR' | 'SUCCESS';
  error?: {
    code: string;
    message: string;
  };
  data: T;
}

export interface commentProps {
  commentImageUris?: string[];
  commentDesc: string;
}

export interface catFollowId {
  contentId: string;
}

export interface commentLikeId {
  commentId: string;
}

export interface SaveTokenProps {
  accessToken: string;
  refreshToken: string;
  nickname: string | null;
}
