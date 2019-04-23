import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { routes } from './app.routing';
import { TwitterEffects } from './store/twitter/twitter.effects';
import { AppComponent } from './app.component';
import { TwPostsComponent } from './container/tw-posts/tw-posts.component';
import { TwCardComponent } from './components/tw-card/tw-card.component';
import { TwHeaderComponent } from './components/tw-header/tw-header.component';
import { TwFooterComponent } from './components/tw-footer/tw-footer.component';
import { TwBodyComponent } from './components/tw-body/tw-body.component';
import { TwCardContainerComponent } from './components/tw-card-container/tw-card-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TwCardComponent,
    TwHeaderComponent,
    TwFooterComponent,
    TwBodyComponent,
    TwPostsComponent,
    TwCardContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      TwitterEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
