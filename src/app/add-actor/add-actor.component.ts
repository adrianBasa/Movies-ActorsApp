import { Component, OnInit, Input, Output, OnDestroy,EventEmitter } from '@angular/core';
// import {HttpService} from "./http.service";
import { Console } from '@angular/core/src/console';
import { Actor } from "../actor/actor.model";
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ActorService } from '../actor/actors.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms/src/form_builder';



@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css'],
})
export class AddActorComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  @Input() addingActor: boolean = true;
  @Input() actor: Actor;
  @Output() actorEditat: EventEmitter<any> = new EventEmitter();
   ActorForm : FormGroup;
   //actor: Actor = new Actor();

  constructor( private actorService: ActorService,
              private APP_ROUTES: ActivatedRoute ) 
  { }

  ngOnInit() {
    if (this.addingActor == false){
    this.ActorForm = new FormGroup({
      Nume : new FormControl(this.actor.Nume_Actor, [Validators.required,  Validators.minLength(3)]),
      img: new FormControl(this.actor.img, [Validators.required, Validators.pattern("https?://.+")]),
      Data_Nasterii: new FormControl(this.actor.Data_Nasterii, [Validators.required, Validators.max(2000), Validators.min(1900),Validators.pattern("[1-9][0-9]+")]),
    });
     }
     else {
      this.ActorForm = new FormGroup({
        Nume : new FormControl('', [Validators.required,  Validators.minLength(3)]),
        img: new FormControl('', [Validators.required, Validators.pattern("https?://.+")]),
        Data_Nasterii: new FormControl('', [Validators.required, Validators.max(2000), Validators.min(1900),Validators.pattern("[1-9][0-9]+")]),
      });
     }
     this.sub = this.APP_ROUTES.params.subscribe(params =>{
       this.id = +params['id'];
     })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  

  saveActor(){
    var localActor = new Actor();
    console.log()
    localActor.Nume_Actor = this.ActorForm.get('Nume').value;
    localActor.img = this.ActorForm.get('img').value;
    localActor.Data_Nasterii = this.ActorForm.get('Data_Nasterii').value;

    if(this.addingActor == false){
      localActor.Id_Actor = this.actor.Id_Actor;
      this.actorService.editActor(localActor).subscribe(
        res => {
          console.log(res);
          this.actorEditat.emit('actor editat');
        },
        err => {
          console.log("Error occured");
          this.actorEditat.emit('actor editat');
        }
      );

    } 
    else {
      console.log(this.ActorForm);
      console.log('Saved: ' +JSON.stringify(this.ActorForm.value));
      this.actorService.addActor(localActor);
      
    }
  
  }
    
}
