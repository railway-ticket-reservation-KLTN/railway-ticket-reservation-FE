import { KhachDatVe } from "./KhachDatVe";
import { VeTaus } from "./VeTaus";

export class TraVeRequest{
    khachDatVe:KhachDatVe;
    maXacThuc:string;
    veTaus:VeTaus[];
   constructor(){
    this.khachDatVe;
    this.maXacThuc = "",
    this.veTaus= [];
   }
}