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
    return this._http.get(`${this.url}myRequestedAds?userId=${userId}`);
  }

  public publisherAdsList(): Observable<any> {
    return this._http.get(`${this.url}myPublishedAds`);
  }
  public verifyAccount(id, accountVerificationCode): Observable<any> {
    return this._http.post(`${this.url}/verifyAccount`, {
      id: id,
      accountVerificationCode: accountVerificationCode,
    });
  }

  public resendAccountVerificationCode(id): Observable<any> {
    return this._http.post(`${this.url}resendAccountVerificationCode`, { id });
  }

  public editUserProfile(profile):Observable<any>{
    return this._http.post(`${this.url}editProfile`,profile);
  }

  public getUserProfile(id):Observable<any>{
    return this._http.get(`${this.url}getUserProfile?id=${id}`);
  }
  public getFreshRequestedAds():Observable<any>{
    return this._http.get(`${this.url}getFreshRequestedAds`);
  }
  // public myAdsList():Observable<any>{
  //   return this._http.get(`${this.url}`)
  // }
  public adPublished(newsDetail):Observable<any>{
    return this._http.post(`${this.url}publishAd`,newsDetail);
  }
  public getMyPublishedAds(userId):Observable<any>{
    return this._http.get(`${this.url}myPublishedAds?userId=${userId}`);
  }
}
