import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(string) {
    return this.http.get('http://www.omdbapi.com/?apikey=f79aeba3&s=' + string);
  }

  getDetailsData(string) {
    return this.http.get('http://www.omdbapi.com/?apikey=f79aeba3&i=' + string);
  }
  
}
