import {Injectable} from '@angular/core';
import {Http,Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import { Actor } from './actor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestMethod,Headers } from '@angular/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ActorService {
    private httpactor = 'https://angularbeckend.azurewebsites.net/api/actorsData';
    constructor(private http:Http,private httpclient:HttpClient){}
  
    getActors()
    {
        return this.http.get(this.httpactor)
        .map((res:Response) => <Actor>res.json())

    }

    addActor(actor:Actor){
        console.log("add actor apelat")
        return this.httpclient.post(this.httpactor,actor, httpOptions).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );
         
    }

    editActor(actor:Actor){
        console.log("edit actor apelat")
        return this.httpclient.put(this.httpactor,actor, httpOptions);
         
    }
    
    deleteActor(id: number){
     
     this.httpclient.delete('https://angularbeckend.azurewebsites.net/api/actorsData' + id);
     
   }

 

}