import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent {

  movieTitleSearch = new FormControl('');
  data: {};
  showError: true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  searchByMovieTitle() {
    this.dataService.getData(this.movieTitleSearch.value)
      .subscribe(
        (data) => {
          this.data = { ...data }
          if (data['Response'] === "True") {
            console.log(data['Response'])
            this.router.navigate(['/search', { title: this.movieTitleSearch.value }])
          } else {
            this.showError = true
          }
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

