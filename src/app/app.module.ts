import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import {MovieService} from './movie/movie.service';
import { ActorComponent } from './actor/actor.component';
import{ActorService} from './actor/actors.service';
import { AddActorComponent } from './add-actor/add-actor.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { routing } from './app.routing';
import { AddMovieComponent } from './add-movie/add-movie.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule}   from 'ngx-toastr'





@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ActorComponent,
    AddActorComponent,
    AddMovieComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    ToastrModule.forRoot()
    
    
  ],
  providers: [MovieService,ActorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
