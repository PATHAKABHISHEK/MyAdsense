import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
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
  public loggedIn() {
    return !!localStorage.getItem("token");
  }

  public requestAd(ad): Observable<any> {
    return this._http.post(`${this.url}requestAd`, ad);
  }

  public requestedADs(userId): Observable<any> {
    return this._http.post(`${this.url}myRequestedAds`,userId);
  }

  public publisherAdsList(): Observable<any> {
    return this._http.get(`${this.url}myPublishedAds`);
  }
  public verifyAccount(id, accountVerificationCode):Observable<any>{
    return this._http.post(`${this.url}/verifyAccount`, {
      id: id,
      accountVerificationCode: accountVerificationCode
    });
  }

  public resendAccountVerificationCode(id):Observable<any>{
    return this._http.post(`${this.url}resendAccountVerificationCode`,{id});
  }
  // public myAdsList():Observable<any>{
  //   return this._http.get(`${this.url}`)
  // }
}
