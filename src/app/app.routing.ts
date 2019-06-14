import { Routes } from '@angular/router';
import { TwPostsComponent } from './container/tw-posts/tw-posts.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/twitter-posts'
  },
  {
    path: 'twitter-posts', component: TwPostsComponent
  }
];
