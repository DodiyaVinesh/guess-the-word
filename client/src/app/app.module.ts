import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoompageComponent } from './pages/roompage/roompage.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NameDialogComponent } from './components/dialog/name.dialog.component';
import { RoomIdDialogComponent } from './components/dialog/roomid.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RoompageComponent,
    CreatePageComponent,
    HeaderComponent,
    NameDialogComponent,
    RoomIdDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
