import { Component } from '@angular/core';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';
import { TraVe } from 'src/app/domain/TraVe';

@Component({
  selector: 'app-return-tickets',
  templateUrl: './return-tickets.component.html',
  styleUrls: ['./return-tickets.component.css']
})
export class ReturnTicketsComponent {
  gaDenError=true;
  gaDiError=true;
  macTauError=true;
  Error=true;
  hidenError=true;
  hidenSuccess=true;
  traVe= new TraVe;
  khachDatVe=new KhachDatVe;
}
