import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';
import { TraVe } from 'src/app/domain/TraVe';
import { TraVeInFo } from 'src/app/domain/TraVeInFo';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-return-tickets',
  templateUrl: './return-tickets.component.html',
  styleUrls: ['./return-tickets.component.css']
})
export class ReturnTicketsComponent implements OnInit {
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
  selectedLoads: any[] = [];

  constructor(
    private service:MachineService,
    private router: Router,
  )
{

}

ngOnInit() {
  
}
// btnSearch(){

//   this.service.traVe(this.traVe).subscribe(data =>{
//     this.traVeInfo=data;
//     console.log(this.traVeInfo); 
// })
//   if(this.traVeInfo.length > 0){
//     this.Susscess = false;
//     this.khachDatVe ={
//       hoTen:this.traVeInfo[0].khachDatVe.hoTen,
//       email:this.traVeInfo[0].khachDatVe.email,
//       sdt:this.traVeInfo[0].khachDatVe.sdt,
//       soGiayTo:this.traVeInfo[0].khachDatVe.soGiayTo,
      
      
//     }
//   }
//   else{
//     alert("Không tìm thấy vé")

//   }
  
// }
btnSearch(){

  this.service.traVe(this.traVe).subscribe(data =>{
    this.traVeInfo=data;
    console.log(this.traVeInfo);
    if(this.traVeInfo.length > 0){
    this.Susscess = false;
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
}, error => {
  alert(error.error.moTaLoi);
});
}

selectLoad(event: any, load: any) {
  load.isSelected = event.target.checked;
  
  if (load.isSelected) {
    this.selectedLoads.push(load);   
  } else {
    const index = this.selectedLoads.indexOf(load);
    if (index > -1) {
      this.selectedLoads.splice(index, 1);
    }
  }
  console.log(this.selectedLoads);
}
btnNext(){
  if(this.selectedLoads.length > 0){
    this.router.navigate(['/xac-nhan-email'], { queryParams: { data: JSON.stringify(this.selectedLoads) } });  
  }
  else{
    alert("Bạn chưa chọn vé cần trả")
  }
}


}



