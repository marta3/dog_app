// Angular
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgOptimizedImage } from '@angular/common';

// Servicios
import { DogService } from '../dog.service';

// Interfaces
import { BreedWithImage } from '../models/breed.interface';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-breed-search',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, NgOptimizedImage,MatProgressSpinnerModule ],
  templateUrl: './breed-search.component.html',
  styleUrl: './breed-search.component.scss',
  providers: [DogService]
})
export class BreedSearchComponent implements OnInit{
  breeds: BreedWithImage[] = [];
  searchQuery: string = '';
  filteredBreeds: BreedWithImage[] = [];

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.dogService.getBreeds().subscribe(breeds => {
      this.breeds = breeds;
      this.filteredBreeds = breeds;
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredBreeds = this.breeds.filter(breed =>
        breed.breed.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        breed.subBreeds.some(subBreed => subBreed.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    } else {
      this.filteredBreeds = this.breeds;
    }
  }
}