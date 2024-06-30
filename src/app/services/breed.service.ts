import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private selectedBreedSubject = new BehaviorSubject<any>(null);
  selectedBreed$ = this.selectedBreedSubject.asObservable();

  setSelectedBreed(breed: any): void {
    this.selectedBreedSubject.next(breed);
  }

  getSelectedBreed(): any {
    return this.selectedBreedSubject.value;
  }
}
