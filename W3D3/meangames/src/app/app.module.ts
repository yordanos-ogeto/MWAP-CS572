import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GameListComponent
      },
      // {
      //   path: "**",
      //   component: WelcomeComponent
      // },
      {
        path: "**",
        component: FooterComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
