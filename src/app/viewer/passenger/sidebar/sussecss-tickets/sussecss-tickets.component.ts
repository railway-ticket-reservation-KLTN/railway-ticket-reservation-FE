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
  listVe: any[];
  tongGia:any = 0;
  htmlTinhTongTien = '';
  htmlTinhTrangThanhToan = '';
  htmlTrangThaiGiaoDich = '';
  htmlThongBaoThanhToan = '';
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
     this.tinhTongTien(this.xacnhanthongtinveInfo);
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
      this.htmlTinhTrangThanhToan = `Chưa thanh toán`;
      this.htmlTrangThaiGiaoDich = `GIAO DỊCH KHÔNG THÀNH CÔNG`;
      this.htmlThongBaoThanhToan = `Quý khách vui lòng sử dụng
      mã đặt chỗ &nbsp;<label class="text-info">${this.xacnhanthongtinveInfo.maDatCho}</label>&nbsp; tới các nhà ga bán vé của <label class="text-info">Đường Sắt Việt Nam</label>&nbsp; để thanh toán`;
    } else if(this.xacnhanthongtinveInfo.maDatVe != null) {
      this.htmlMaContent = `Mã đặt vé:&nbsp;${xacnhanthongtinveInfo.maDatVe}</label><br>`
      this.htmlTinhTrangThanhToan = `Đã thanh toán`;
      this.htmlTrangThaiGiaoDich = `GIAO DỊCH THÀNH CÔNG`
    }

  }
  tinhTongTien(xacnhanthongtinveInfo:XacNhanThongTinVeInfo) {
    xacnhanthongtinveInfo.veTaus.forEach(veTau => {
      this.tongGia += veTau.donGia;
    });
    this.htmlTinhTongTien = `${this.tongGia}`;
  }
}
