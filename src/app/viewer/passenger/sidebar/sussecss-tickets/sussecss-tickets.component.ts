import { Component, NgIterable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';
import { XacNhanThongTinVeInfo } from 'src/app/domain/XacNhanThongTinVeInfo';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-sussecss-tickets',
  templateUrl: './sussecss-tickets.component.html',
  styleUrls: ['./sussecss-tickets.component.css']
})
export class SussecssTicketsComponent implements OnInit {
   

  // tenHanhKhach:string;
  // soGiayTo:string;
  // email:string;
  // sdt:string;
  khachDatVe=new KhachDatVe;
  xacnhanthongtinveInfo: any;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private machineService: MachineService

  ){

  }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.xacnhanthongtinveInfo = JSON.parse(params['data']);})
      console.log(this.xacnhanthongtinveInfo);
     
     console.log(this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.hoTen);
     this.khachDatVe ={
        hoTen:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.hoTen,
        soGiayTo:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.soGiayTo,
        email:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.email,
        sdt:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.sdt
     }
      
  }
  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.xacnhanthongtinveInfo.veTaus.length; i++) {
      total += this.xacnhanthongtinveInfo.veTaus[i].donGia - 1000;
    }
    return total;
  }
}
