import { Routes } from '@angular/router';
import { BreedSearchComponent } from './breed-search/breed-search.component';
import { WelcomeComponent } from './welcome/welcome.component';

 export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'search', component: BreedSearchComponent },
    { path: '**', component: WelcomeComponent }
  ];