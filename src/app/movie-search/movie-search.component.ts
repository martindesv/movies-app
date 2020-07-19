import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent {

  movieTitleSearch = new FormControl('');
  data: {};
  detailsData: {};

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  searchByMovieTitle() {
    this.dataService.getData(this.movieTitleSearch.value)
      .subscribe(
        (data) => this.data = { ...data },
        error => console.log(error),
      );
  }

  goToDetails(imdbID) {
    this.dataService.getDetailsData(imdbID)
      .subscribe(
        (detailsData) => this.detailsData = { ...detailsData },
        error => console.log(error),
        () => this.router.navigate(['details'])
      );
  }

}
