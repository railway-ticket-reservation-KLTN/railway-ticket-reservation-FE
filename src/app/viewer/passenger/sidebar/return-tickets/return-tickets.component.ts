import { Component } from '@angular/core';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';
import { TraVe } from 'src/app/domain/TraVe';
import { TraVeInFo } from 'src/app/domain/TraVeInFo';
import { MachineService } from 'src/app/service/machine-service.service';

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
  Susscess=true;
  traVe= new TraVe;
  khachDatVe=new KhachDatVe;
  traVeInfo:any[];
  constructor(
    private service:MachineService,
  )
{

}
btnSearch(){
  console.log(this.traVe);
  this.service.traVe(this.traVe).subscribe(data =>{
    this.traVeInfo=data;
})

  if(this.traVeInfo.length > 0){
    this.Susscess=false;
    this.khachDatVe ={
      hoTen:this.traVeInfo[0].khachDatVe.hoTen,
      email:this.traVeInfo[0].khachDatVe.email,
      sdt:this.traVeInfo[0].khachDatVe.sdt,
      soGiayTo:this.traVeInfo[0].khachDatVe.soGiayTo,
    }
  }
  else{
    alert("Không tìm thấy vé")

  }
  
}

}



