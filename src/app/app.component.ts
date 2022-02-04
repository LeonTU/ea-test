import { Component, OnInit } from '@angular/core';
import { IFestivalDto } from './models/festivalDto';
import { IBand, ILabelList } from './models/record';
import { FestivalsService } from './services/festivals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ea-test';
  festivals: IFestivalDto[] = [];
  labelList: ILabelList;
  private bandList: IBand[];

  constructor(private festivalsService: FestivalsService) { }

  ngOnInit(): void {

    this.festivalsService.getFestivlas().subscribe(
      response => {
        this.labelList = {};
        this.bandList = [];
        console.log(response);

        response.forEach(festival => {
          festival.bands.forEach(band => {
            if (band.recordLabel) {
              if (!this.labelList[band.recordLabel]) {
                this.labelList[band.recordLabel] = [];
              }
              this.labelList[band.recordLabel].push(this.updateBand(band.name, festival.name));
            }
          });
        });

        console.log(this.labelList);

      }, error => console.log(error)

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
}
