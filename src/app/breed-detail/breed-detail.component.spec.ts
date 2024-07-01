import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailComponent } from './breed-detail.component';
import { BreedService } from '../services/breed.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

describe('BreedDetailComponent', () => {
  let component: BreedDetailComponent;
  let fixture: ComponentFixture<BreedDetailComponent>;
  let breedService: jasmine.SpyObj<BreedService>;

  beforeEach(async () => {
    const breedServiceSpy = jasmine.createSpyObj('BreedService', ['selectedBreed$']);

    await TestBed.configureTestingModule({
      imports: [MatCardModule, BreedDetailComponent],
      providers: [
        { provide: BreedService, useValue: breedServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ breed: 'hound' }) // Mock the route parameter
          }
        }
      ]
    }).compileComponents();

    breedService = TestBed.inject(BreedService) as jasmine.SpyObj<BreedService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get breed details on init', () => {
    const mockBreed = { breed: 'hound', image: 'https://example.com/hound.jpg', subBreeds: [] };
    breedService.selectedBreed$ = of(mockBreed); // Mock the selectedBreed$ observable

    fixture.detectChanges(); // trigger ngOnInit

    expect(component.breed).toEqual(mockBreed);
  });
});