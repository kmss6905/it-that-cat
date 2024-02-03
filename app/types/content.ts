export interface CatObjProps {
  [key: string]: string | string[] | number | null | undefined;
  name: string;
  description: string;
  lon: string | null;
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
