import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url;
  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000/api/v1/user/";
  }
  public signUp(user): Observable<any> {
    return this._http.post(`${this.url}signUp`, user);
  }

  public signIn(user): Observable<any> {
    return this._http.post(`${this.url}signIn`, user);
  }
}
