import { MainPageComponent } from './containers/main-page/main-page.component';
import { TasklistPageComponent } from './containers/tasklist-page/tasklist-page.component';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: ':room', component: TasklistPageComponent },
  { path: '', component: MainPageComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent, TasklistPageComponent, MainPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // enablePersistence = offline tilassa toimii
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
