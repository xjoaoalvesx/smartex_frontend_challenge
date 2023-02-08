import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  getRestaurants(postcode: string): Observable<any> {
    return this.http.get<any>(
      '/api/' + postcode
    ).pipe(
      map( (response: any) => response.Restaurants ),
      catchError(async (err) => console.log(err))
    )
  }

}
