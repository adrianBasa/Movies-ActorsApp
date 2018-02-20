import { Component, OnInit } from '@angular/core';
import {Movie} from './movie.model'
import {MovieService} from './movie.service'
import { ActorService } from '../actor/actors.service';
import { Actor } from '../actor/actor.model';
import { MovieXActor } from './MovieXActor';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers:[MovieService]
})
export class MovieComponent implements OnInit {
  moviesXactors: MovieXActor;
  movies: Movie[] = [];
  movieToEdit: Movie;
  selectedActor: Actor;
  selectedActorsMovies: Movie[]=[];
  constructor (private movieService :MovieService,
              private toastr : ToastrService) { }

  ngOnInit() {
    
    this.movieService.getMovies()
    .subscribe(moviesXactors => {
      this.moviesXactors = moviesXactors;
      this.movies = this.TransformMovies(moviesXactors.Movies, moviesXactors.Actors);
      console.log(JSON.stringify(this.movies))
    });
  }
  
  public setSelectedActor(actor:Actor, movie: Movie[]){
    this.selectedActor=actor;   
    this.selectedActorsMovies=[];

    movie.forEach(m=>{
      if(m.Id_Actors.includes(this.selectedActor.Id_Actor))
        this.selectedActorsMovies.push(m)
    })
  
    console.log("actorul selectat este" + this.selectedActor.Nume_Actor + "Numar filme"+this.selectedActorsMovies.length )
  }

  public setMovieToEdit(movie: Movie){
    this.movieToEdit = movie;
  }

  public TransformMovies(movie: Movie[], actors: Actor[]): Movie[]{

    var transformedMovies: Movie[] = [];
    movie.forEach(m => {
      var movieToAdd: Movie = m;
      movieToAdd.Actori = [];
      m.Id_Actors.forEach(id => {
        var actor = actors.find(act => act.Id_Actor == id);
        movieToAdd.Actori.push(actor);
      })
      transformedMovies.push(movieToAdd);
    });
    return transformedMovies;
  }
  getMovieToEdit (Id:number){
    return this.movies[Id];
  }

  movieEditatEvent(evt) {
    console.log("movieeditat event apelat")
    this.movieService.getMovies()
    .subscribe(moviesXactors => {
      this.moviesXactors = moviesXactors;
      this.movies = [];
      this.movies = this.TransformMovies(moviesXactors.Movies, moviesXactors.Actors);
      console.log(JSON.stringify(this.movies))
    });
    this.movieToEdit = null;
  } 
  onDelete(id:number){
    
    if (confirm('Are you sure to delete this record?')== true){
      // webapi  delete nu merge. eroare CORS
    //  this.movieService.deleteMovie(id); 
  this.movies = this.movies.filter(a =>a.Id_movie != id);
  this.toastr.success('Movie a fost sters  cu succes');
    }
}
}