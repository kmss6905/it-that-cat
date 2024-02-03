export interface CatObjProps {
  [key: string]: string | string[] | number | boolean | null | undefined;
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
}

export interface RegisterCatObjProps extends CatObjProps {
  images: string[];
  catEmoji: number;
}

export interface ContentObjProps extends RegisterCatObjProps {
  contentId: number;
  numberOfCatSlaves: number;
  numberOfComments: number;
  countOfBookMark: number;
  userUid: number;
  nickname: string;
  bookMark: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentCardProps {
  content: ContentObjProps;
}
