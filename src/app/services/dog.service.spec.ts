import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogService } from './dog.service';

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService]
    });
    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch breed list with images', () => {
    const breedListResponse = {
      message: {
        hound: [],
        pug: [],
        retriever: ['golden', 'labrador']
      },
      status: 'success'
    };

    const breedImageResponse = {
      message: 'https://images.dog.ceo/breeds/hound/n02089973_1003.jpg',
      status: 'success'
    };

    service.getBreeds().subscribe(breeds => {
      expect(breeds.length).toBe(3);
      expect(breeds[0].breed).toBe('hound');
      expect(breeds[0].image).toBe(breedImageResponse.message);
    });

    const req = httpMock.expectOne('https://dog.ceo/api/breeds/list/all');
    expect(req.request.method).toBe('GET');
    req.flush(breedListResponse);

    const imgReqs = httpMock.match(r => r.url.includes('https://dog.ceo/api/breed/'));
    expect(imgReqs.length).toBe(3);
    imgReqs.forEach(req => req.flush(breedImageResponse));
  });
});