import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent {
  page = "";
  collectionSize = "";
  loading = false;

  movieTitleSearch = new FormControl('');
  data: {};
  showError: true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let title = this.route.snapshot.paramMap.get('title');
    this.page = this.route.snapshot.paramMap.get('page');
    if (title) {
      this.setSearchData(title, this.page);
    }
  }

  searchByMovieTitle() {
    this.setSearchData(this.movieTitleSearch.value, 1);
  }

  setSearchData(title, pageNum) {
    console.log('here')
    this.movieTitleSearch.setValue(title)
    this.loading = true;
    this.dataService.getData(title, pageNum)
      .subscribe(
        (data) => {
          this.data = { ...data }
          this.loading = false;
          if (data['Response'] === "True") {
            this.collectionSize = data['totalResults']
            this.router.navigate(['/search', { title: this.movieTitleSearch.value, page: pageNum }])
          } else {
            this.router.navigate(['/search', { result: 'error' }])
            this.showError = true
          }
        },
        error => {
          this.loading = false;
          this.showError = true
          console.log(error)
        }
      );
  }

  // maybe
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('button pressed');
    window.location.reload();
  }

  goToDetails(imdbID) {
    this.dataService.getDetailsData(imdbID)
      .subscribe(
        () => this.router.navigate(['details', { id: imdbID }]),
        error => console.log(error),
      );
  }

  loadPage(event) {
    this.setSearchData(this.movieTitleSearch.value, Number(event.originalTarget.childNodes[0].data)); // There were issues with "out-of-the-box" page change functionality, so I did a workaround.
    window.scrollTo(0,0);
  }
  
}

