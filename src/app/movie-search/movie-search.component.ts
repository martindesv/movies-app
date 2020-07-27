import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent {

  movieTitleSearch = new FormControl('');
  data: {};

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ imdbID: string }>,
    private location: Location
  ) {}

  searchByMovieTitle() {
    this.dataService.getData(this.movieTitleSearch.value)
      .subscribe(
        (data) => {
          this.data = { ...data }
          this.router.navigate(['/search', { title: this.movieTitleSearch.value }])
        },
        error => console.log(error),
      );
  }

  dataAfterBack(title) {
    console.log('dataAfterBack')
    this.movieTitleSearch.setValue(title)
    this.dataService.getData(title)
      .subscribe(
        (data) => this.data = { ...data },
        error => console.log(error),
      );
  }

  ngOnInit() {
    let title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.dataAfterBack(title);
    }
    }

  goToDetails(imdbID) {
    this.dataService.getDetailsData(imdbID)
      .subscribe(
        () => this.router.navigate(['/search/details', { id: imdbID }]),
        error => console.log(error),
      );
  }
  
}

