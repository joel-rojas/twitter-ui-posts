import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { reducers, metaReducers } from './store';
import { environment } from '../environments/environment';

import { routes } from './app.routing';
import { TwitterEffects } from './store/twitter/twitter.effects';
import { AppComponent } from './app.component';
import { TwCardContainerComponent } from './components/tw-card-container/tw-card-container.component';
import { TwPostsComponent } from './container/tw-posts/tw-posts.component';
import { TwCardComponent } from './components/tw-card/tw-card.component';
import { TwHeaderComponent } from './components/tw-header/tw-header.component';
import { TwFooterComponent } from './components/tw-footer/tw-footer.component';
import { TwBodyComponent } from './components/tw-body/tw-body.component';
import { TwSwitchBtnComponent } from './components/tw-switch-btn/tw-switch-btn.component';
import { TwIncdecCardsComponent } from './components/tw-incdec-cards/tw-incdec-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    TwCardComponent,
    TwHeaderComponent,
    TwFooterComponent,
    TwBodyComponent,
    TwPostsComponent,
    TwCardContainerComponent,
    TwSwitchBtnComponent,
    TwIncdecCardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      TwitterEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    DragDropModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
