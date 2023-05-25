import { Component, OnInit } from '@angular/core';
import { HanhTrinh } from 'src/app/domain/HanhTrinh';
import { KiemTraVeInfo } from 'src/app/domain/KiemTraVeInfo';
import { KiemTraVeRequest } from 'src/app/domain/KiemTraVeRequest';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-check-tickets',
  templateUrl: './check-tickets.component.html',
  styleUrls: ['./check-tickets.component.css']
})
export class CheckTicketsComponent implements OnInit {
  kiemTraVeInfo = new KiemTraVeInfo();
  hanhTrinhInfo = new HanhTrinh();
  htmlHienThiLabel = "";
  kiemTraVeRequest = new KiemTraVeRequest();
  hidenSuccess = true;
  hidenError = true;
  showResult = true;
  gaDiError=true;
  gaDenError=true;
  macTauError=true;
  Error=true;
  isErrormaVe!:boolean;
  isErrortenTau!:boolean;
  isError!:boolean;
  isErrorGaDen!:boolean;
  isErrorsoGiayTo!:boolean;
  dataRequest:any;
  dataArray:any[] = [];
  constructor(
    private machineService: MachineService
  ) { }

  ngOnInit() {

  }


  async onSearch() {

 
    this.hidenError = true;
    this.hidenSuccess = true;
    this.showResult=true;
    this.machineService.getKiemTraVe(this.kiemTraVeRequest).subscribe(data => {
      this.kiemTraVeInfo = data;
      this.hidenSuccess = false;
      this.hanhTrinhInfo = data.hanhTrinh;
      this.showResult=false;
      console.log(this.kiemTraVeInfo);
      if(data != null) {
        this.htmlHienThiLabel = `Thông tin vé`;
      }
    },
      (error) => {
        this.hidenError = false;
        this.showResult=true;
      })

  }

  btnprint(){
    this.dataRequest = {
      maVe: this.kiemTraVeInfo.maVe,
      tenHanhKhach: this.kiemTraVeInfo.tenHanhKhach,
      soGiayTo: this.kiemTraVeInfo.soGiayTo,
      donGia: this.kiemTraVeInfo.donGia,
      doiTuong: this.kiemTraVeInfo.doiTuong,
      tenTau: this.kiemTraVeInfo.tenTau,
      soGhe: this.kiemTraVeInfo.soGhe,
      soToa: this.kiemTraVeInfo.soToa,
      gaDi: this.kiemTraVeInfo.hanhTrinh.gaDi,
      gaDen:this.kiemTraVeInfo.hanhTrinh.gaDen,
      ngayDi: this.kiemTraVeInfo.hanhTrinh.ngayDi,
      gioDi: this.kiemTraVeInfo.hanhTrinh.gioDi,
    }
    this.dataArray.push(this.dataRequest);
  this.machineService.getPDFInve(this.dataArray).subscribe(data => {
    console.log(data);
    const pdf = new Blob([data], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdf);
    const iframe = document.createElement('iframe');
    iframe.id = 'print';
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      const contentWindow = iframe.contentWindow;
      if (contentWindow) {
        contentWindow.print();
      }
    };
  });
  
}
 
}
