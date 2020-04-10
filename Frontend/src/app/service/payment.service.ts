import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  url = "http://localhost:3000/api/v1/user/";
  constructor(private http: HttpClient) {}

  pay(paymentObject): Observable<any> {
    return this.http.post(`${this.url}pay`, paymentObject);
  }
}
