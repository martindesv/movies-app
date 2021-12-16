import {Component, OnInit, HostListener, ViewChildren} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent {
  page: Number;
  collectionSize: Number;
  loading = false;

  movieTitleSearch = new FormControl('');
  data: {};
  showError: boolean;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let title = this.route.snapshot.paramMap.get('title');
    this.page = Number(this.route.snapshot.paramMap.get('page'));
    if (title) {
      this.setSearchData(title, this.page);
    }
  }

  searchByMovieTitle() {
    this.setSearchData(this.movieTitleSearch.value, 1);
  }

  setSearchData(title, pageNum) {
    this.loading = true;
    this.dataService.getData(title, pageNum)
      .subscribe(
        (data) => {
          this.data = { ...data };
          this.loading = false;
          this.movieTitleSearch.setValue(title);
          if (data['Response'] === 'True') {
            this.collectionSize = data['totalResults'];
            this.router.navigate(['/search', { title: this.movieTitleSearch.value, page: pageNum }])
          } else {
            this.router.navigate(['/search', { result: 'error' }])
            this.showError = true;
          }
        },
        error => {
          this.loading = false;
          this.showError = true;
          console.log(error);
        }
      );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    window.location.reload();
  }

  goToDetails(imdbID, index) {
    document.getElementsByClassName('spinner' + index)[0].removeAttribute('hidden');
    document.getElementsByClassName('dataColumn' + index)[0].setAttribute('hidden', 'true');
    this.router.navigate(['details', { id: imdbID }]);
  }

  loadPage(page: Number) {
    this.setSearchData(this.movieTitleSearch.value, page);
    window.scrollTo(0, 0);
  }
}

