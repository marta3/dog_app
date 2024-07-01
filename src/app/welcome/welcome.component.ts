// Angular
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButtonModule],
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
