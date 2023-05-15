import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { gheDaDat } from 'src/app/domain/GheDaDat';
import { NguoiDatVe } from 'src/app/domain/NguoiDatVe';
import { TraCho } from 'src/app/domain/TraCho';
import { XacNhanThongTin } from 'src/app/domain/XacNhanThongTin';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-pay-tickets',
  templateUrl: './pay-tickets.component.html',
  styleUrls: ['./pay-tickets.component.css']
})
export class PayTicketsComponent implements OnInit {
  public selectedSeatId: string[] = [];
  nguoiDatVe=new NguoiDatVe();
  confirmationForm: FormGroup;
  gheDaDatList: gheDaDat[];
  gheDaDatListKhuHoi: gheDaDat[];
  private confirmationCode: string;
  xacnhanthongtin=new XacNhanThongTin();
  xacnhanthongtinKhuHoi=new XacNhanThongTin();
  tenKhach:[];
  tenKhachKhuHoi:[];
  traCho=new TraCho;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private machineService: MachineService
   ) { }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.gheDaDatList = JSON.parse(params['data']);
      this.gheDaDatListKhuHoi = JSON.parse(params['gheDaDatListKhuHoi']);
      
    });
     
    if (this.gheDaDatListKhuHoi && this.gheDaDatListKhuHoi.length > 0) {
      this.route.queryParams.subscribe(params => {
        this.gheDaDatList = JSON.parse(params['data']);
      this.gheDaDatListKhuHoi = JSON.parse(params['gheDaDatListKhuHoi']);
      })
    } 
    else {
      // Nếu gheDaDatListKhuHoi không có phần tử
      // Thực hiện xử lý tương ứng
      this.route.queryParams.subscribe(params => {
        this.gheDaDatList = JSON.parse(params['data']);
      this.gheDaDatListKhuHoi = [];
      })
    }if (this.gheDaDatList && this.gheDaDatList.length > 0) {
      this.route.queryParams.subscribe(params => {
        this.gheDaDatList = JSON.parse(params['data']);
      this.gheDaDatListKhuHoi = JSON.parse(params['gheDaDatListKhuHoi']);
      })
    } 
    else {
      // Nếu gheDaDatListKhuHoi không có phần tử
      // Thực hiện xử lý tương ứng
      this.route.queryParams.subscribe(params => {
        this.gheDaDatList = [];
        this.gheDaDatListKhuHoi = JSON.parse(params['gheDaDatListKhuHoi']);
      })
    }


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
  let totalKhuHoi=0;
  if(this.gheDaDatListKhuHoi.length > 0){
        if(this.gheDaDatList.length > 0){
          for (let i = 0; i < this.gheDaDatList.length; i++) {
            total += this.gheDaDatList[i].giaVe + 1000;
          }
          for (let i = 0; i < this.gheDaDatListKhuHoi.length; i++) {
            totalKhuHoi += this.gheDaDatListKhuHoi[i].giaVe + 1000;
          }
        }else{
          for (let i = 0; i < this.gheDaDatListKhuHoi.length; i++) {
            totalKhuHoi += this.gheDaDatListKhuHoi[i].giaVe + 1000;
          }
        }
  }else{
    for (let i = 0; i < this.gheDaDatList.length; i++) {
      total += this.gheDaDatList[i].giaVe + 1000;
    }
  }
 

  return total+totalKhuHoi;
}
btnNext(){
  
  this.xacnhanthongtin.gheDaDat=this.gheDaDatList;
  this.xacnhanthongtin.nguoiDatVe=this.nguoiDatVe;
  this.xacnhanthongtinKhuHoi.gheDaDat=this.gheDaDatListKhuHoi;
  this.xacnhanthongtinKhuHoi.nguoiDatVe=this.nguoiDatVe;
  this.router.navigate(['/xac-nhan-thong-tin-ve'], { queryParams: { data: JSON.stringify(this.xacnhanthongtin),
    xacnhanthongtinKhuHoi: JSON.stringify(this.xacnhanthongtinKhuHoi) } });
  console.log(this.xacnhanthongtin);
}
btnMomo(){
  this.nguoiDatVe.hinhthucthanhtoan = "THANH_TOAN_MOMO"
}
btnTraSau(){
  this.nguoiDatVe.hinhthucthanhtoan = "TRA_SAU"
}
removeTicket(maGhe: string) {
  this.traCho = {
   gaDi : this.gheDaDatList[0].gaDi,
    gaDen :this.gheDaDatList[0].gaDen,
   soToa :this.gheDaDatList[0].soToa,
   maGhe : maGhe,
   tenTau : this.gheDaDatList[0].tenTau,
    ngayDi : this.gheDaDatList[0].ngayDi,
   gioDi : this.gheDaDatList[0].gioDi,
   gioDen : this.gheDaDatList[0].gioDen,
    trangThai :"DAT_CHO",
  }
  this.machineService.traCho(this.traCho).subscribe(data =>{
    console.log(data);
    
  });
  
  const index = this.gheDaDatList.findIndex((item) => item.maGhe === maGhe);
  if (index !== -1) {
    this.gheDaDatList.splice(index, 1); // Xóa vé khỏi mảng gheDaDatListKhuHoi
  }
  console.log(this.gheDaDatList);
  
}
removeTicketKhuHoi(maGhe: string) {
  this.traCho = {
   gaDi : this.gheDaDatListKhuHoi[0].gaDi,
    gaDen :this.gheDaDatListKhuHoi[0].gaDen,
   soToa :this.gheDaDatListKhuHoi[0].soToa,
   maGhe : maGhe,
   tenTau : this.gheDaDatListKhuHoi[0].tenTau,
    ngayDi : this.gheDaDatListKhuHoi[0].ngayDi,
   gioDi : this.gheDaDatListKhuHoi[0].gioDi,
   gioDen : this.gheDaDatListKhuHoi[0].gioDen,
    trangThai :"DAT_CHO",
  }
  this.machineService.traCho(this.traCho).subscribe(data =>{
    console.log(data);
    
  });
  
  const index = this.gheDaDatListKhuHoi.findIndex((item) => item.maGhe === maGhe);
  if (index !== -1) {
    this.gheDaDatListKhuHoi.splice(index, 1); // Xóa vé khỏi mảng gheDaDatListKhuHoi
  }
  console.log(this.gheDaDatListKhuHoi);
  
}
}

