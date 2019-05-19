import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { URL_API } from '../app.api';
import { tap, catchError } from 'rxjs/operators'
import { TokenReturn } from '../models/user/token';
import { tokenKey } from '@angular/core/src/view';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string;
  tk: TokenReturn;
  constructor(private http: HttpClient) { }
  addOrder(data): Observable<TokenReturn> {
    this.tk = JSON.parse(sessionStorage.getItem('token'))
    //seta o header caso necessário
    this.url = `${URL_API}/api/order`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
      'Accept': 'application/json;',
      'Authorization': 'Bearer ' + this.tk.access_token
    });
    return this.http.post<TokenReturn>(this.url, data, { headers: headers })
      .pipe(
        tap(s => this.log("Get TOKEN")
        ),
        catchError(this.handleError<TokenReturn>('Get-Token'))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Entrou no HandleError")
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`HomeService: ${message}`);
  }
}
