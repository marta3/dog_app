import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreedService } from '../services/breed.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-detail.component.html',
  styleUrl: './breed-detail.component.scss'
})
export class BreedDetailComponent implements OnInit {
  breed: any;

  constructor(private route: ActivatedRoute, private breedService: BreedService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.breedService.selectedBreed$.subscribe(breed => {
        if (breed) {
          this.breed = breed;
        }
      });
    });
  }
}
