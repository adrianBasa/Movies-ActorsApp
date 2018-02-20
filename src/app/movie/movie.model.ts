import { Actor } from "../actor/actor.model";
  

export class Movie {
    Id_movie : number;
    Denumire:string;
    Genul:string;
    Anul_Prductiei:string;
    Id_Actors:number[];
    Actori: Actor[];
}