export interface IFestivalDto {
  name?: string;
  bands: IBandDto[];
}

export interface IBandDto {
  name: string;
  recordLabel?: string;
}
