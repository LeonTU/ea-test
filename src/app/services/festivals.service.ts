import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFestivalDto } from '../models/festivalDto';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  baseUrl = '/codingtest/api/v1/festivals';

  constructor(private http: HttpClient) {
  }

  getFestivlas() {
    return this.http.get<IFestivalDto[]>(this.baseUrl);
  }
}
