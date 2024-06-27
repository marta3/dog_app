import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  title = 'Dog App';
  owner = 'Marta María Armario Borrás';

  constructor(private router: Router) {}

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
