import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  url="http://localhost:3000/api/v1/newspaper";
  constructor(private http:HttpClient) { }
  public getLanguage(): Observable<any>{
    return this.http.get(`${this.url}/get_newspaper_language`);
  }
  public getCategory(): Observable<any>{
    return this.http.get(`${this.url}/get_newspaper_category`);
  }  
  public getNewspaper(newspaper): Observable<any>{
    return this.http.post(`${this.url}/get_newspaper_based_on_language_and_category`,newspaper);
  }
  public getNewspaperEdition(newspaper): Observable<any>{
    return this.http.post(`${this.url}/get_newspaper_edition`,newspaper);
  }
  public getAllNewspaperAdRates(newspaper):Observable<any>{
    return this.http.post(`${this.url}/get_all_newspaper_ad_rate`,newspaper);

  }
  public get_all_newspaper_logos():Observable<any>{
    return this.http.get(`${this.url}/get_all_newspaper_logos`);
  }
  
}
