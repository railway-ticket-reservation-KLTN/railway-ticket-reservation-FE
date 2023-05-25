import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';

@Component({
  selector: 'app-sussecss-return',
  templateUrl: './sussecss-return.component.html',
  styleUrls: ['./sussecss-return.component.css']
})
export class SussecssReturnComponent implements OnInit {
  dataConfirmTraVe:any[]=[];
  khachDatVe=new KhachDatVe;
  tongGia:any = 0;
  htmlTinhTongTien = '';
  constructor(
    private route: ActivatedRoute,

  ){

  }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.dataConfirmTraVe = JSON.parse(params['data']);
      console.log(this.dataConfirmTraVe);
      this.khachDatVe ={
        hoTen:this.dataConfirmTraVe[0].khachDatVe.hoTen,
        soGiayTo:this.dataConfirmTraVe[0].khachDatVe.soGiayTo,
        email:this.dataConfirmTraVe[0].khachDatVe.email,
        sdt:this.dataConfirmTraVe[0].khachDatVe.sdt,
     }
     console.log(this.khachDatVe);
     
    })
  }

  tinhTongTien() {
    this.dataConfirmTraVe.forEach(veTau => {
      this.tongGia += veTau.donGia;
    });
    this.htmlTinhTongTien = `${this.tongGia}`;
  }
  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.dataConfirmTraVe.length; i++) {
      total += this.dataConfirmTraVe[i].donGia;
    }
    return total;
  }
}
