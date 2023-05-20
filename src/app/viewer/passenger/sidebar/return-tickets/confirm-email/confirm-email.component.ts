import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachDatVe } from 'src/app/domain/KhachDatVe';
import { TraVeRequest } from 'src/app/domain/TraVeRequest';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  dataConfirmTraVe: any[];
  khachDatVe = new KhachDatVe;
  traVeRequest = new TraVeRequest;
  tenHanhKhach: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private machineService: MachineService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dataConfirmTraVe = JSON.parse(params['data']);
      console.log(this.dataConfirmTraVe);


    })
  }

  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.dataConfirmTraVe.length; i++) {
      total += this.dataConfirmTraVe[i].donGia - 20000;
    }

    return total;
  }

  onNextButtonClick() {

    if(this.traVeRequest.maXacThuc == null || this.traVeRequest.maXacThuc == ""){
      alert("Phải nhập mã xác nhận")
    }
   else{
    this.traVeRequest.khachDatVe = {
      hoTen: this.dataConfirmTraVe[0].khachDatVe.hoTen,
      email: this.dataConfirmTraVe[0].khachDatVe.email,
      soGiayTo: this.dataConfirmTraVe[0].khachDatVe.soGiayTo,
      sdt: this.dataConfirmTraVe[0].khachDatVe.sdt,
    }
    if (this.dataConfirmTraVe.length > 0) {
      for (let i = 0; i < this.dataConfirmTraVe.length; i++) {

        this.traVeRequest.veTaus[i] = {
          tenHanhKhach: this.dataConfirmTraVe[i].tenHanhKhach,
          soGiayTo: this.dataConfirmTraVe[i].soGiayTo,
          donGia: this.dataConfirmTraVe[i].donGia,
          loaiVe: this.dataConfirmTraVe[i].loaiVe,
          doiTuong: this.dataConfirmTraVe[i].doiTuong,
          trangThai: this.dataConfirmTraVe[i].trangThai,
          tenTau: this.dataConfirmTraVe[i].tenTau,
          maGhe: this.dataConfirmTraVe[i].maGhe,
          soGhe: this.dataConfirmTraVe[i].soGhe,
          soToa: this.dataConfirmTraVe[i].soToa,
          gaDi: this.dataConfirmTraVe[i].hanhTrinh.gaDi,
          gaDen: this.dataConfirmTraVe[i].hanhTrinh.gaDen,
          ngayDi: this.dataConfirmTraVe[i].hanhTrinh.ngayDi,
          ngayDen: this.dataConfirmTraVe[i].hanhTrinh.ngayDen,
          gioDi: this.dataConfirmTraVe[i].hanhTrinh.gioDi,
          gioDen: this.dataConfirmTraVe[i].hanhTrinh.gioDen,
          tinhTrang: this.dataConfirmTraVe[i].tinhTrang
        }

      }
    }
    console.log(this.traVeRequest);
    this.machineService.traVeDaDat(this.traVeRequest).subscribe(data =>{
      console.log(data);
      alert("Trả vé thành công")
    })
   }
  }

  btnEmail() {
    this.khachDatVe = {
      hoTen: this.dataConfirmTraVe[0].khachDatVe.hoTen,
      email: this.dataConfirmTraVe[0].khachDatVe.email,
      soGiayTo: this.dataConfirmTraVe[0].khachDatVe.soGiayTo,
      sdt: this.dataConfirmTraVe[0].khachDatVe.sdt,
    }

    this.machineService.getCodeEmail(this.khachDatVe).subscribe(data => {
      console.log(data);
    })
  }
}
