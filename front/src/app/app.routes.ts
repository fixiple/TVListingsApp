import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { CurrentlyWatchingComponent } from './currently-watching/currently-watching.component';
import { UpcomingReleasesComponent } from './upcoming-releases/upcoming-releases.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    //we pass the categorie of the media  and the identifier
    { path : 'details/:cat/:id', component: DetailsComponent},
    { path : 'search', component: SearchComponent},
    { path : 'watchList', component: CurrentlyWatchingComponent},
    { path : 'releases', component: UpcomingReleasesComponent}
];
