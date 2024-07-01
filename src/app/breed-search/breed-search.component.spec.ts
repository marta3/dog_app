import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedSearchComponent } from './breed-search.component';
import { DogService } from '../services/dog.service';
import { BreedService } from '../services/breed.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BreedSearchComponent', () => {
  let component: BreedSearchComponent;
  let fixture: ComponentFixture<BreedSearchComponent>;
  let dogService: jasmine.SpyObj<DogService>;
  let breedService: jasmine.SpyObj<BreedService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dogServiceSpy = jasmine.createSpyObj('DogService', ['getBreeds']);
    const breedServiceSpy = jasmine.createSpyObj('BreedService', ['setSelectedBreed']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, BrowserAnimationsModule, BreedSearchComponent],
      providers: [
        { provide: DogService, useValue: dogServiceSpy },
        { provide: BreedService, useValue: breedServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    dogService = TestBed.inject(DogService) as jasmine.SpyObj<DogService>;
    breedService = TestBed.inject(BreedService) as jasmine.SpyObj<BreedService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter breeds based on search query', () => {
    component.breeds = [
      { breed: 'hound', image: 'https://example.com/hound.jpg', subBreeds: [] },
      { breed: 'pug', image: 'https://example.com/pug.jpg', subBreeds: ['miniature'] }
    ];
    component.searchQuery = 'hound';
    component.onSearch();

    expect(component.filteredBreeds.length).toBe(1);
    expect(component.filteredBreeds[0].breed).toBe('hound');

    component.searchQuery = 'miniature';
    component.onSearch();

    expect(component.filteredBreeds.length).toBe(1);
    expect(component.filteredBreeds[0].breed).toBe('pug');
  });

  it('should navigate to breed detail on viewBreedDetail', () => {
    const breed = { breed: 'hound', image: 'https://example.com/hound.jpg', subBreeds: [] };
    component.viewBreedDetail(breed);

    expect(breedService.setSelectedBreed).toHaveBeenCalledWith(breed);
    expect(router.navigate).toHaveBeenCalledWith(['/breed', breed.breed]);
  });
});