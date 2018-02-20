import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Movie } from './movie.model';
import { MovieXActor } from './MovieXActor';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Observable } from 'rxjs/Observable';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class MovieService {
  

    private httpUrl = 'http://localhost:4005/api/moviedata';
    
      
    
    constructor(private http:Http, private httpclient:HttpClient){}
 
    getMovies()
    {
        return this.http.get(this.httpUrl)
        .map((res:Response) => <MovieXActor>res.json())
       /* return this.http.get('api/moviesAndActors.json')
        .map((res:Response) => <MovieXActor>res.json())*/
    }

    addMovie(movie:Movie){
        console.log("add movie apelat")
        return this.httpclient.post(this.httpUrl,movie, httpOptions).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );
         
    }
    editMovie(movie:Movie){
      console.log("edit movie apelat")
      return this.httpclient.put(this.httpUrl,movie, httpOptions);
       
  }
    
    deleteMovie(id: number){
     
     this.httpclient.delete(this.httpUrl + "/" + id).subscribe((ok)=>{console.log(ok)});
     
   }

 
}
