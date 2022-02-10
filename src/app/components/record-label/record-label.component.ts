import { Component, OnInit } from '@angular/core';
import { IFestivalDto } from 'src/app/models/festivalDto';
import { IRecordLabel } from 'src/app/models/record';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-record-label',
  templateUrl: './record-label.component.html',
  styleUrls: ['./record-label.component.css']
})
export class RecordLabelComponent implements OnInit {
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
      (error: Error) => {
        this.errorMessage = error.message;
        console.log(error.toString());
      }
    );
  }
}
