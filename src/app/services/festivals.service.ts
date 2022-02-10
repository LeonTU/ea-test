import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFestivalDto } from '../models/festivalDto';
import { IBand, IRecordLabel, IRecordLabelList } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  baseUrl = environment.festivalBaseUrl;
  bandList: IBand[];
  recordLabelList: IRecordLabelList;
  sortedRecordLabelList: IRecordLabel[];
  private festivalList: IFestivalDto[];

  constructor(private http: HttpClient) { }

  getRecordLabels(): Observable<IRecordLabel[]> {
    return this.http.get<IFestivalDto[]>(this.baseUrl).pipe(
      map((response) => {
        if (!response) {
          throw new Error('We are getting empty result, please try again later.');
        }

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

  getFestivalList(): IFestivalDto[] {
    return this.festivalList;
  }

  private updateBand(bandName: string, festivalName: string): IBand {
    let band = this.bandList.find(b => b.name === bandName);

    if (!band) {
      band = { name: bandName, festivals: [] };
      this.bandList.push(band);
    }

    if (festivalName) {
      band.festivals.push(festivalName);
    }

    return band;
  }

  private sortRecordLabelList(recordLabelList: IRecordLabelList): void {
    const keys = Object.keys(recordLabelList).sort();
    keys.forEach(key => this.sortedRecordLabelList.push({
      name: key,
      bands: this.recordLabelList[key]
    }));
  }
}
