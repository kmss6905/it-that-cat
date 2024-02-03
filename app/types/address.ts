export interface RegionState {
  addrName: string;
  sido: string;
  sigungu: string;
  dong: string;
  mainAddrNo: string;
  subAddrNo: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PositionError {
  code: number;
  message: string;
}

export interface GeolocationState {
  position: Coordinates | null;
  error: PositionError | null;
}
