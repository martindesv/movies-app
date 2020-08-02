import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url: string = 'https://www.omdbapi.com/?apikey=f79aeba3&';

  getData(string, pageNum) {
    return this.http.get(this.url + 's=' + string + '&page=' + pageNum);
  }

  getDetailsData(string) {
    return this.http.get(this.url + 'i=' + string);
  }
  
}
