export interface CatObjProps {
  [key: string]: string | string[] | number | boolean | null | undefined;
  contentId?: string | null;
  name: string;
  description: string;
  lng: string | null;
  lat: string | null;
  jibunAddrName: string | undefined;
  jibunMainAddrNo: string | undefined;
  jibunSido: string | undefined;
  jibunSigungu: string | undefined;
  jibunDong: string | undefined;
  jibunSubAddrNo: string | undefined;
  neuter: string;
  group: string;
  catPersonalities: string[];
  images?: string[];
}

export interface UpdateCatObjProps {
  name: string;
  description: string;
  neuter: string;
  group: string;
  catPersonalities: string[];
  imageKeys: string[];
  catEmoji: number;
}

export interface RegisterCatObjProps extends CatObjProps {
  imageKeys: string[];
  catEmoji: number;
}

export interface ContentObjProps extends RegisterCatObjProps {
  numberOfCatSlaves: number;
  numberOfComments: number;
  countOfBookMark: number;
  countOfComments: number;
  isReported: boolean;
  userUid: number;
  nickname: string;
  bookMark: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentCardProps {
  content: ContentObjProps;
}

export interface ContentReportProps {
  contentId: string | null;
  category: string;
  content: string;
}
