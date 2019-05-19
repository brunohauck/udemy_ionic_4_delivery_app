import { Restaurant } from './../models/restaurant/restaurant';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RestaurantList } from '../models/restaurant/restaurantList';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class RestaurantesService {


  private url: string;
  constructor(
    private http: HttpClient,
  ) {
    this.url = "http://localhost:8000/api/restaurants";
  }
 
  /** GET heroes from the server */
  getRestaurantes (): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url)
      .pipe(
        tap(todos => this.log('listando restaurantes')),
        catchError(this.handleError('getRestaurantes', []))
      );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private log(message: string) {
     console.log(`RestauranteService: ${message}`);
  }
}
