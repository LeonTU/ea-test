import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IFestivalDto } from '../models/festivalDto';
import { IBand, IRecordLabel, IRecordLabelList } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  baseUrl = '/codingtest/api/v1/festivals';
  bandList: IBand[];
  recordLabelList: IRecordLabelList;
  sortedRecordLabelList: IRecordLabel[];
  private festivalList: IFestivalDto[];

  constructor(private http: HttpClient) { }

  getRecordLabels() {
    return this.http.get<IFestivalDto[]>(this.baseUrl).pipe(
      map((response) => {
        this.festivalList = response;
        this.bandList = [];
        this.recordLabelList = {};
        this.sortedRecordLabelList = [];

        response.forEach(festival => {
          festival.bands.forEach(band => {
            if (band.recordLabel) {
              if (!this.recordLabelList[band.recordLabel]) {
                this.recordLabelList[band.recordLabel] = [];
              }
              this.recordLabelList[band.recordLabel].push(this.updateBand(band.name, festival.name));
            }
          });
        });

        this.sortRecordLabelList(this.recordLabelList);
        return this.sortedRecordLabelList;
      })
    );
  }

  private updateBand(bandName: string, festivalName: string): IBand {
    let band = this.bandList.find(band => band.name === bandName);

    if (!band) {
      band = { name: bandName, festivals: [] };
    }

    if (festivalName) {
      band.festivals.push(festivalName);
    }

    this.bandList.push(band);
    return band;
  }

  private sortRecordLabelList(recordLabelList: IRecordLabelList) {
    const keys = Object.keys(recordLabelList).sort();
    keys.forEach(key => this.sortedRecordLabelList.push({
      name: key,
      bands: this.recordLabelList[key]
    }));
  }

  getFestivalList(): IFestivalDto[] {
    return this.festivalList;
  }
}
