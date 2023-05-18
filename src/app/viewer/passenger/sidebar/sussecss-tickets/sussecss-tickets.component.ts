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
  khachDatVe=new KhachDatVe;
  xacnhanthongtinveInfo: any;
  htmlMaContent = '';
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private machineService: MachineService

  ){}
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.xacnhanthongtinveInfo = JSON.parse(params['data']);})
      console.log(this.xacnhanthongtinveInfo);
     
     console.log(this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.hoTen);
     this.khachDatVe ={
        hoTen:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.hoTen,
        soGiayTo:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.soGiayTo,
        email:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.email,
        sdt:this.xacnhanthongtinveInfo.veTaus[0].khachDatVe.sdt,
     }
     this.ganMaTuDong(this.xacnhanthongtinveInfo);
  }
  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.xacnhanthongtinveInfo.veTaus.length; i++) {
      total += this.xacnhanthongtinveInfo.veTaus[i].donGia + 1000;
    }
    return total;
  }
  ganMaTuDong(xacnhanthongtinveInfo:XacNhanThongTinVeInfo) {
    console.log(xacnhanthongtinveInfo);
    if(this.xacnhanthongtinveInfo.maDatCho != null) {
      this.htmlMaContent = `Mã đặt chỗ:&nbsp;${xacnhanthongtinveInfo.maDatCho}</label><br>`;
    } else if(this.xacnhanthongtinveInfo.maDatVe != null) {
      this.htmlMaContent = `Mã đặt vé:&nbsp;${xacnhanthongtinveInfo.maDatVe}</label><br>`
    }

  }
}
