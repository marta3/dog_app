import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// INTERFACES
import { BreedImageResponse, BreedWithImage, BreedsResponse } from './models/breed.interface';
@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://dog.ceo/api';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<BreedWithImage[]> {
    return this.http.get<BreedsResponse>(`${this.apiUrl}/breeds/list/all`).pipe(
      map(response => response.message),
      switchMap(breeds => {
        const breedObservables = Object.keys(breeds).map(breed => {
          const subBreeds = breeds[breed];
          return this.getBreedImage(breed).pipe(
            map(image => ({
              breed,
              subBreeds,
              image
            }))
          );
        });
        return forkJoin(breedObservables);
      })
    );
  }

  getBreedImage(breed: string): Observable<string> {
    return this.http.get<BreedImageResponse>(`${this.apiUrl}/breed/${breed}/images/random`).pipe(
      map(response => response.message)
    );
  }
}