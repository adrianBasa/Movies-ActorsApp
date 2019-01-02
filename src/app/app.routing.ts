import {Routes, RouterModule} from "@angular/router";
import  { AddActorComponent } from "./add-actor/add-actor.component";
import{ModuleWithProviders} from "@angular/core";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import {MovieComponent} from "./movie/movie.component";
import {ActorComponent} from "./actor/actor.component";

const APP_ROUTES : Routes = [
    {path:'add-actor', component:AddActorComponent},
    {path:'add-actor/:id' ,component:AddActorComponent},
    {path:'add-movie', component:AddMovieComponent},
    { path: 'add-movie/:id', component: AddMovieComponent },
    {path:'movie' ,component: MovieComponent},
    {path: 'actor', component:ActorComponent}
    
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);