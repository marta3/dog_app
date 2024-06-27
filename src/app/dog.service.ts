import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BreedWithImage } from './models/breed.interface';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://dog.ceo/api/breeds/list/all';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<string[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => Object.keys(response.message))
    );
  }

  getBreedImage(breed: string): Observable<string> {
    const breedImageUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
    return this.http.get<any>(breedImageUrl).pipe(
      map(response => response.message)
    );
  }

  getBreedsWithImages(): Observable<BreedWithImage[]> {
    return this.getBreeds().pipe(
      switchMap(breeds => {
        const breedImages$ = breeds.map(breed => this.getBreedImage(breed).pipe(
          map(image => ({
            breed,
            image,
            loading: true
          }))
        ));
        return forkJoin(breedImages$);
      })
    );
  }
}
