import { Component, OnInit } from '@angular/core';
import {ActorService} from './actors.service';
import {Actor} from './actor.model'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers:[ActorService],
})
export class ActorComponent implements OnInit {
 actors : Actor ;
 actorToEdit: Actor;
  constructor(private actorService : ActorService,
    private APP_ROUTES: ActivatedRoute) { }

  ngOnInit() {
    this.actorService.getActors()
    .subscribe(actors => {
      this.actors=actors;
      //console.log(this.actors.length);
    }
  );
    
  }
  public setActorToEdit(actor: Actor){
    this.actorToEdit = actor;
  }

 
  getActorToEdit (Id:number){
    return this.actors[Id];
  }

 
  

  onDeleteActor(id:number){
   
    if (confirm('Are you sure to delete this record?')== true){
      // webapi  delete nu merge. eroare CORS
      this.actorService.deleteActor(id); 
      //this.actors = this.actors.filter(ac =>ac.Id_Actor != id);
    }
}
}
