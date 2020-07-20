import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { goToDetails } from '../data.actions';

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
    private store: Store<{ imdbID: string }>
  ) {}

  searchByMovieTitle() {
    this.dataService.getData(this.movieTitleSearch.value)
      .subscribe(
        (data) => this.data = { ...data },
        error => console.log(error),
      );
  }

  goToDetails(imdbID) {
    this.store.dispatch(goToDetails());
    //this.router.navigate(['details', { id: imdbID }])
  }
  
}

