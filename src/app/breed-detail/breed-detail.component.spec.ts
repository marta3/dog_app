import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailComponent } from './breed-detail.component';
import { BreedService } from '../services/breed.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BreedDetailComponent', () => {
  let component: BreedDetailComponent;
  let fixture: ComponentFixture<BreedDetailComponent>;
  let breedService: jasmine.SpyObj<BreedService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const breedServiceSpy = jasmine.createSpyObj('BreedService', ['selectedBreed$']);

    await TestBed.configureTestingModule({
      declarations: [BreedDetailComponent],
      providers: [
        { provide: BreedService, useValue: breedServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ breed: 'hound' }) } }
      ]
    }).compileComponents();

    breedService = TestBed.inject(BreedService) as jasmine.SpyObj<BreedService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch selected breed on init', () => {
    const breed = { breed: 'hound', image: 'https://example.com/hound.jpg' };
    breedService.selectedBreed$ = of(breed);

    fixture.detectChanges();

    expect(component.breed).toEqual(breed);
  });
});
