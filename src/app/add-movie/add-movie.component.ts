import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from "../movie/movie.model";
import { FormGroup, FormControl,Validators} from '@angular/forms';
import {Http,Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { MovieService } from '../movie/movie.service';
import { MovieXActor } from '../movie/MovieXActor';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { ActivatedRoute } from '@angular/router';
import {ToastrService}    from 'ngx-toastr'
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnDestroy  {
 
  id: number;
  private sub: any;
  @Input() addingMovie: boolean = true;
  @Input() movie: Movie;
  @Output() movieEditat: EventEmitter<any> = new EventEmitter();
  
  movieForm : FormGroup;
  
 
  constructor(private movieService:MovieService,
              private APP_ROUTES: ActivatedRoute,
              private toastr : ToastrService
            ) 
  { 

  }
  

  ngOnInit() {
    if(this.addingMovie == false){
      this.movieForm = new FormGroup({
        Denumire : new FormControl(this.movie.Denumire, [Validators.required, , Validators.minLength(3)]),
        Genul: new FormControl(this.movie.Genul, [Validators.required, , Validators.minLength(3)]),
        Anul_Productiei: new FormControl(this.movie.Anul_Prductiei, [Validators.required, Validators.max(2018), Validators.min(1900),Validators.pattern("[1-9][0-9]+")]),
      });
    }
    else  {
    this.movieForm = new FormGroup({
      Denumire : new FormControl('', [Validators.required, , Validators.minLength(3)]),
      Genul: new FormControl('', [Validators.required, , Validators.minLength(3)]),
      Anul_Productiei: new FormControl('', [Validators.required, Validators.max(2018), Validators.min(1900),Validators.pattern("[1-9][0-9]+")]),      
    });
  }
      this.sub = this.APP_ROUTES.params.subscribe(params => {
        this.id = +params['id'];
      
      })
   
      }
    
      ngOnDestroy() {
        this.sub.unsubscribe();
      }
  
  save(){
    var localMovie = new Movie();
    localMovie.Denumire = this.movieForm.get('Denumire').value;
    localMovie.Genul = this.movieForm.get('Genul').value;
    localMovie.Anul_Prductiei = this.movieForm.get('Anul_Productiei').value;

    if(this.addingMovie == false){
      localMovie.Id_movie = this.movie.Id_movie;
      this.toastr.success('Movie Editat adaugat cu succes');
      this.movieService.editMovie(localMovie).subscribe
      (
        res => {
          console.log(res);
          this.movieEditat.emit('Movie editat');
        },
        err => {
          console.log("Error occured");
          this.movieEditat.emit('Movie editat');
        }
      );

    } 
    else {
      console.log(this.movieForm);
      console.log('Saved: ' +JSON.stringify(this.movieForm.value));
      this.movieService.addMovie(localMovie);
      this.toastr.success('Movie nou adaugat cu succes');
      
    }
  
  }
 
    }

  
  
     
    
   
    
 

