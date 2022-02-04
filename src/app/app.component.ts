import { Component, OnInit } from '@angular/core';
import { IFestivalDto } from './models/festivalDto';
import { IRecordLabel } from './models/record';
import { FestivalsService } from './services/festivals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ea-test';
  recordLabelList: IRecordLabel[];
  festivalList: IFestivalDto[];
  errorMessage: string = null;

  constructor(private festivalsService: FestivalsService) { }

  ngOnInit(): void {

    this.festivalsService.getRecordLabels().subscribe(
      response => {
        this.recordLabelList = response;
        this.festivalList = this.festivalsService.getFestivalList();

        console.log(this.festivalList);
        console.log(this.recordLabelList);
      },
      (error: string) => {
        this.errorMessage = error;
        console.log(error);
      }
    );
  }
}
