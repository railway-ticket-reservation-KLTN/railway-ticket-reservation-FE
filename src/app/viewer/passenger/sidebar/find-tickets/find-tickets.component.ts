import { Component } from '@angular/core';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-find-tickets',
  templateUrl: './find-tickets.component.html',
  styleUrls: ['./find-tickets.component.css']
})
export class FindTicketsComponent {
  ngayDi: Date;
  ngayDen: Date;
  isCheck=true;
  minDate: string;
  gaDi: string;
  gaDen:string;
  loaiChuyenDi:string;

  
  constructor(
    private machineService:MachineService
  ){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  }
   enableRadio(){
    
    this.isCheck=true;
    this.ngayDen = this.ngayDi;
   }
   enableRadioTwo(){
    this.isCheck=false;
   }

  onSearch(){
    alert("Tìm kiếm thành công")
    console.log(this.gaDi);
    console.log(this.gaDen);
    console.log(this.ngayDi);
    console.log(this.ngayDen);
    
   
    
    
  }
  
}
