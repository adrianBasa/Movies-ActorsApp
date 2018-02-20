import {Routes, RouterModule} from "@angular/router";
import  { AddActorComponent } from "./add-actor/add-actor.component";
import{ModuleWithProviders} from "@angular/core";
import { AddMovieComponent } from "./add-movie/add-movie.component";

const APP_ROUTES : Routes = [
    {path:'add-actor', component:AddActorComponent},
    {path:'add-actor/:id' ,component:AddActorComponent},
    {path:'add-movie', component:AddMovieComponent},
    { path: 'add-movie/:id', component: AddMovieComponent }
    
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);