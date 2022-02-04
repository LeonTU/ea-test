
export interface IRecordLabelList {
  [key: string]: IBand[];
}

export interface IBand {
  name: string;
  festivals: string[];
}

export interface IRecordLabel {
  name: string;
  bands: IBand[];
}
