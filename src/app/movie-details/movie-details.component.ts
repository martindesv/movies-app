import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {

  detailsData: {};

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    let imdbID = this.route.snapshot.paramMap.get('id');

    this.dataService.getDetailsData(imdbID)
    .subscribe(
      (detailsData) => this.detailsData = { ...detailsData },
      error => console.log(error),
    );
  }

  backClicked() {
    this.location.back();
  }

}
