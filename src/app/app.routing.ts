import { Routes } from '@angular/router';
import { TwPostsComponent } from './container/tw-posts/tw-posts.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/twitter-posts-app'
  },
  {
    path: 'twitter-posts-app', component: TwPostsComponent
  }
];
