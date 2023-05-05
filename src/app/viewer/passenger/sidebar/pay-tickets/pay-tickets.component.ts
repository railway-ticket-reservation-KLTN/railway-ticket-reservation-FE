import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { gheDaDat } from 'src/app/domain/GheDaDat';
import { NguoiDatVe } from 'src/app/domain/NguoiDatVe';
import { XacNhanThongTin } from 'src/app/domain/XacNhanThongTin';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-pay-tickets',
  templateUrl: './pay-tickets.component.html',
  styleUrls: ['./pay-tickets.component.css']
})
export class PayTicketsComponent implements OnInit {
  nguoiDatVe=new NguoiDatVe();
  confirmationForm: FormGroup;
  gheDaDatList: gheDaDat[];
  private confirmationCode: string;
  xacnhanthongtin=new XacNhanThongTin();
  tenKhach:[];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private machineService: MachineService
   ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gheDaDatList = JSON.parse(params['data']);})
      console.log(this.gheDaDatList);

    this.confirmationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
      ticketCode: ['', Validators.required]
    });
  }

  
generateCode(): void {
  const randomNum = Math.floor(Math.random() * 1000000);
  this.confirmationCode = randomNum.toString().padStart(6, '0');
}
getTotalPrice() {
  let total = 0;
  for (let i = 0; i < this.gheDaDatList.length; i++) {
    total += this.gheDaDatList[i].giaVe - 1000;
  }
  return total;
}
btnNext(){
  
  this.xacnhanthongtin.gheDaDat=this.gheDaDatList;
  this.xacnhanthongtin.nguoiDatVe=this.nguoiDatVe;
  this.router.navigate(['/xac-nhan-thong-tin-ve'], { queryParams: { data: JSON.stringify(this.xacnhanthongtin) } });
  console.log(this.xacnhanthongtin);
  
}
btnMomo(){
  this.nguoiDatVe.hinhthucthanhtoan = "THANH_TOAN_MOMO"
}
btnTraSau(){
  this.nguoiDatVe.hinhthucthanhtoan = "TRA_SAU"
}
}

