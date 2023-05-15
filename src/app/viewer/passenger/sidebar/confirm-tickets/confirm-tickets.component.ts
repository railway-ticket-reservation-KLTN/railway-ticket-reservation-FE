import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeTauInfoKhuHoi } from 'src/app/domain/VeTauInfoKhuHoi';
import { XacNhanThongTin } from 'src/app/domain/XacNhanThongTin';
import { XacNhanThongTinVe } from 'src/app/domain/XacNhanThongTinVe';
import { XacNhanThongTinVeInfo } from 'src/app/domain/XacNhanThongTinVeInfo';
import { XacNhanThongTinVeInfoMoMo } from 'src/app/domain/XacNhanThongTinVeInfoMoMo';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-confirm-tickets',
  templateUrl: './confirm-tickets.component.html',
  styleUrls: ['./confirm-tickets.component.css']
})
export class ConfirmTicketsComponent {
xacnhanthongtin=new XacNhanThongTin();
xacnhanthongtinKhuHoi=new XacNhanThongTin();
xacnhanthongtinve =new XacNhanThongTinVe;
xacnhanthongtinveKhuHoi =new XacNhanThongTinVe;
xacnhanthongtinveInfo = new XacNhanThongTinVeInfo;
xacNhanThongTinVeInfoMoMo =new XacNhanThongTinVeInfoMoMo;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private machineService: MachineService

  ){
    this.route.queryParams.subscribe(params => {
      this.xacnhanthongtin = JSON.parse(params['data']);
      this.xacnhanthongtinKhuHoi = JSON.parse(params['xacnhanthongtinKhuHoi']);
    });


  }

  getTotalPrice() {
    let total = 0;
    let totalKhuHoi = 0;
    for (let i = 0; i < this.xacnhanthongtin.gheDaDat.length; i++) {
      total += this.xacnhanthongtin.gheDaDat[i].giaVe + 1000;
    }
    for (let i = 0; i < this.xacnhanthongtinKhuHoi.gheDaDat.length; i++) {
      totalKhuHoi += this.xacnhanthongtinKhuHoi.gheDaDat[i].giaVe + 1000;
    }

    return total+totalKhuHoi;
  }

  onNextButtonClick() {
    if (this.xacnhanthongtin.gheDaDat.length > 0) {
      for (let i = 0; i < this.xacnhanthongtin.gheDaDat.length; i++) {
        this.xacnhanthongtinve.veTaus[i] = {
          trangThai: '0',
          tenHanhKhach: this.xacnhanthongtin.gheDaDat[i].tenKhach,
          soGiayTo: this.xacnhanthongtin.gheDaDat[i].giayTo,
          donGia: this.xacnhanthongtin.gheDaDat[i].giaVe,
          loaiVe: this.xacnhanthongtin.gheDaDat[i].loaiVe,
          doiTuong: this.xacnhanthongtin.gheDaDat[i].doiTuong,
          tenTau: this.xacnhanthongtin.gheDaDat[i].tenTau,
          maGhe: this.xacnhanthongtin.gheDaDat[i].maGhe,
          soGhe: this.xacnhanthongtin.gheDaDat[i].soGhe,
          soToa: this.xacnhanthongtin.gheDaDat[i].soToa,
          gaDi: this.xacnhanthongtin.gheDaDat[i].gaDi,
          gaDen: this.xacnhanthongtin.gheDaDat[i].gaDen,
          ngayDi: this.xacnhanthongtin.gheDaDat[i].ngayDi,
          ngayDen: this.xacnhanthongtin.gheDaDat[i].ngayDen,
          gioDi: this.xacnhanthongtin.gheDaDat[i].gioDi,
          gioDen: this.xacnhanthongtin.gheDaDat[i].gioDen,
        };
      }
      this.xacnhanthongtinve.khachDatVe = {
        hoTen: this.xacnhanthongtin.nguoiDatVe.tenHanhKhach,
        soGiayTo: this.xacnhanthongtin.nguoiDatVe.soGiayTo,
        email: this.xacnhanthongtin.nguoiDatVe.email,
        sdt: this.xacnhanthongtin.nguoiDatVe.sdt,
      }
      this.xacnhanthongtinve.hinhThucThanhToan = this.xacnhanthongtin.nguoiDatVe.hinhthucthanhtoan;
      this.xacnhanthongtinve.ngayLap = "2023-4-16"
      console.log(this.xacnhanthongtinve);
      if (this.xacnhanthongtin.nguoiDatVe.hinhthucthanhtoan == "THANH_TOAN_MOMO") {
        this.machineService.thanhToanMomo(this.xacnhanthongtinve).subscribe(data => {
          // window.open(data.payUrl, '_blank');
          window.location.href = data.payUrl;
          

        })
      }
      else {
        this.machineService.thanhToanTraSau(this.xacnhanthongtinve).subscribe(data => {

          this.xacnhanthongtinveInfo = data;
          this.router.navigate(['/thong-tin-giao-dich'], { queryParams: { data: JSON.stringify(this.xacnhanthongtinveInfo) } });

        })
      }
      console.log(this.xacnhanthongtinveInfo);
      
    }
    if (this.xacnhanthongtinKhuHoi.gheDaDat.length > 0) {
      for (let i = 0; i < this.xacnhanthongtinKhuHoi.gheDaDat.length; i++) {
        this.xacnhanthongtinveKhuHoi.veTaus[i] = {
          trangThai: '0',
          tenHanhKhach: this.xacnhanthongtinKhuHoi.gheDaDat[i].tenKhach,
          soGiayTo: this.xacnhanthongtinKhuHoi.gheDaDat[i].giayTo,
          donGia: this.xacnhanthongtinKhuHoi.gheDaDat[i].giaVe,
          loaiVe: this.xacnhanthongtinKhuHoi.gheDaDat[i].loaiVe,
          doiTuong: this.xacnhanthongtinKhuHoi.gheDaDat[i].doiTuong,
          tenTau: this.xacnhanthongtinKhuHoi.gheDaDat[i].tenTau,
          maGhe: this.xacnhanthongtinKhuHoi.gheDaDat[i].maGhe,
          soGhe: this.xacnhanthongtinKhuHoi.gheDaDat[i].soGhe,
          soToa: this.xacnhanthongtinKhuHoi.gheDaDat[i].soToa,
          gaDi: this.xacnhanthongtinKhuHoi.gheDaDat[i].gaDi,
          gaDen: this.xacnhanthongtinKhuHoi.gheDaDat[i].gaDen,
          ngayDi: this.xacnhanthongtinKhuHoi.gheDaDat[i].ngayDi,
          ngayDen: this.xacnhanthongtinKhuHoi.gheDaDat[i].ngayDen,
          gioDi: this.xacnhanthongtinKhuHoi.gheDaDat[i].gioDi,
          gioDen: this.xacnhanthongtinKhuHoi.gheDaDat[i].gioDen,
        };
      }
      this.xacnhanthongtinveKhuHoi.khachDatVe = {
        hoTen: this.xacnhanthongtinKhuHoi.nguoiDatVe.tenHanhKhach,
        soGiayTo: this.xacnhanthongtinKhuHoi.nguoiDatVe.soGiayTo,
        email: this.xacnhanthongtinKhuHoi.nguoiDatVe.email,
        sdt: this.xacnhanthongtinKhuHoi.nguoiDatVe.sdt,
      }
      this.xacnhanthongtinveKhuHoi.hinhThucThanhToan = this.xacnhanthongtinKhuHoi.nguoiDatVe.hinhthucthanhtoan;
      this.xacnhanthongtinveKhuHoi.ngayLap = "2023-4-16",
      console.log(this.xacnhanthongtinveKhuHoi);
      if (this.xacnhanthongtinKhuHoi.nguoiDatVe.hinhthucthanhtoan == "THANH_TOAN_MOMO"){
        this.machineService.thanhToanMomo(this.xacnhanthongtinveKhuHoi).subscribe(data => {
          window.location.href = data.payUrl;
        })
      }
      else {
        this.machineService.thanhToanTraSau(this.xacnhanthongtinveKhuHoi).subscribe(data => {
        this.xacnhanthongtinveInfo = data;
        this.router.navigate(['/thong-tin-giao-dich'], { queryParams: { data: JSON.stringify(this.xacnhanthongtinveInfo) } });
        })
      }
    }
  }
}
