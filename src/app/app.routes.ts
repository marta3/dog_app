import { Routes } from '@angular/router';
import { BreedSearchComponent } from './breed-search/breed-search.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';

 export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'search', component: BreedSearchComponent },
    { path: 'breed/:breed', component: BreedDetailComponent },
    { path: '**', component: WelcomeComponent },
  ];