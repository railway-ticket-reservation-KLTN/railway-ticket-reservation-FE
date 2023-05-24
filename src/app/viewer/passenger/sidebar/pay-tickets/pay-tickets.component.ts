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
  gheDaDatList: gheDaDat[]=[];
  gheDaDatListKhuHoi: gheDaDat[]=[];
  gheDaDatListKhuHoiTH: gheDaDat[]=[];
  private confirmationCode: string;
  xacnhanthongtin=new XacNhanThongTin();
  xacnhanthongtinKhuHoi=new XacNhanThongTin();
  tenKhach:[];
  agreement :boolean;
  tenKhachKhuHoi:[];
  traCho=new TraCho;
  passengerInputError:boolean;
  maxTicketPerTrainError:boolean;
  passengerInfoError:boolean;
  shortyNameError:boolean;
  congThanhToanError:boolean;
  isErrorhoTen!:boolean;
  isErrorsoGiayTo!:boolean;
  isErroremail!:boolean;
  isErrorsdt!:boolean;
  isErrorhoTenMC!:boolean;
  isErrorsoGiayToMC!:boolean;
  isErrorhoTenKH!:boolean;
  isErrorsoGiayToKH!:boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private machineService: MachineService
   ) { }


  ngOnInit() {
    
    this.passengerInputError=false;
    this.maxTicketPerTrainError=false;
    this.passengerInfoError=false;
    this.shortyNameError=false;
    this.congThanhToanError=false;
    this.nguoiDatVe.hinhthucthanhtoan="THANH_TOAN_MOMO"
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

    this.gheDaDatListKhuHoiTH = [...this.gheDaDatList, ...this.gheDaDatListKhuHoi];
    console.log(this.gheDaDatListKhuHoiTH);
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
  if (this.checkDuplicatePassengers3()) {
    this.shortyNameError=false;
    if(this.checkDuplicatePassengers1()){
      this.passengerInfoError = false;
     if(this.checkDuplicatePassengers()){
      this.maxTicketPerTrainError=false;
      if(this.checkDuplicatePassengers4()){
        this.passengerInputError=false;
        if(this.checkDuplicatePassengers5()){
          this.xacnhanthongtin.gheDaDat=this.gheDaDatList;
        this.xacnhanthongtin.nguoiDatVe=this.nguoiDatVe;
        this.xacnhanthongtinKhuHoi.gheDaDat=this.gheDaDatListKhuHoi;
        this.xacnhanthongtinKhuHoi.nguoiDatVe=this.nguoiDatVe;
        this.router.navigate(['/xac-nhan-thong-tin-ve'], { queryParams: { data: JSON.stringify(this.xacnhanthongtin),
          xacnhanthongtinKhuHoi: JSON.stringify(this.xacnhanthongtinKhuHoi) } });
        console.log(this.xacnhanthongtin);
        this.congThanhToanError=false;
        }else{
            this.congThanhToanError=true;
        }
      }else{
        this.passengerInputError=true;
      }
     }else{
        this.maxTicketPerTrainError=true;
     }
    }
    else{
      this.passengerInfoError = true;
    }
    // Thực hiện hành động tiếp theo khi không có lỗi trùng tên và số giấy tờ
   
  } else {
    // Hiển thị thông báo lỗi cho người dùng
    this.shortyNameError=true;
  }
 
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

checkDuplicatePassengers() {
  for (let i = 0; i < this.gheDaDatList.length; i++) {
    for (let j = i + 1; j < this.gheDaDatList.length; j++) {
      if (
        this.gheDaDatList[i].tenKhach === this.gheDaDatList[j].tenKhach &&
        this.gheDaDatList[i].giayTo === this.gheDaDatList[j].giayTo
      ) {
        // Tên và số giấy tờ trùng nhau
        console.log('Lỗi: Tên và số giấy tờ trùng nhau');
        return false;
      }
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoi.length; i++) {
    for (let j = i + 1; j < this.gheDaDatListKhuHoi.length; j++) {
      if (
        this.gheDaDatListKhuHoi[i].tenKhach === this.gheDaDatListKhuHoi[j].tenKhach &&
        this.gheDaDatListKhuHoi[i].giayTo === this.gheDaDatListKhuHoi[j].giayTo
      ) {
        // Tên và số giấy tờ trùng nhau
        console.log('Lỗi: Tên và số giấy tờ trùng nhau');
        return false;
      }
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoiTH.length; i++) {
    for (let j = i + 1; j < this.gheDaDatListKhuHoiTH.length; j++) {
      if (
        this.gheDaDatListKhuHoiTH[i].tenKhach === this.gheDaDatListKhuHoiTH[j].tenKhach &&
        this.gheDaDatListKhuHoiTH[i].giayTo === this.gheDaDatListKhuHoiTH[j].giayTo
      ) {
        // Tên và số giấy tờ trùng nhau
        console.log('Lỗi: Tên và số giấy tờ trùng nhau');
        return false;
      }
    }
  }
  return true; // Không có lỗi
}

checkDuplicatePassengers1() {
  for (let i = 0; i < this.gheDaDatList.length; i++) {
    for (let j = i + 1; j < this.gheDaDatList.length; j++) {
      if (
        this.gheDaDatList[i].giayTo === this.gheDaDatList[j].giayTo &&
        this.gheDaDatList[i].tenKhach !== this.gheDaDatList[j].tenKhach
      ) {
        // Số giấy tờ trùng nhau, nhưng tên khác nhau
        console.log('Lỗi: Số giấy tờ trùng nhau nhưng tên khác nhau');
        return false;
      }
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoi.length; i++) {
    for (let j = i + 1; j < this.gheDaDatListKhuHoi.length; j++) {
      if (
        this.gheDaDatListKhuHoi[i].giayTo === this.gheDaDatListKhuHoi[j].giayTo &&
        this.gheDaDatListKhuHoi[i].tenKhach !== this.gheDaDatListKhuHoi[j].tenKhach
      ) {
        // Số giấy tờ trùng nhau, nhưng tên khác nhau
        console.log('Lỗi: Số giấy tờ trùng nhau nhưng tên khác nhau');
        return false;
      }
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoiTH.length; i++) {
    for (let j = i + 1; j < this.gheDaDatListKhuHoiTH.length; j++) {
      if (
        this.gheDaDatListKhuHoiTH[i].giayTo === this.gheDaDatListKhuHoiTH[j].giayTo &&
        this.gheDaDatListKhuHoiTH[i].tenKhach !== this.gheDaDatListKhuHoiTH[j].tenKhach
      ) {
        // Số giấy tờ trùng nhau, nhưng tên khác nhau
        console.log('Lỗi: Số giấy tờ trùng nhau nhưng tên khác nhau');
        return false;
      }
    }
  }
  return true; // Không có lỗi
}

checkDuplicatePassengers3() {
  for (let i = 0; i < this.gheDaDatList.length; i++) {
    const passenger = this.gheDaDatList[i];
    
    if (!passenger.tenKhach[i] || !passenger.giayTo) {
      // Tên hoặc số giấy tờ không được nhập
      console.log('Lỗi: Tên hoặc số giấy tờ không được để trống');
      return false;
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoi.length; i++) {
    const passenger = this.gheDaDatListKhuHoi[i];
    
    if (!passenger.tenKhach[i] || !passenger.giayTo) {
      // Tên hoặc số giấy tờ không được nhập
      console.log('Lỗi: Tên hoặc số giấy tờ không được để trống');
      return false;
    }
  }
  for (let i = 0; i < this.gheDaDatListKhuHoiTH.length; i++) {
    const passenger = this.gheDaDatListKhuHoiTH[i];
    
    if (!passenger.tenKhach[i] || !passenger.giayTo) {
      // Tên hoặc số giấy tờ không được nhập
      console.log('Lỗi: Tên hoặc số giấy tờ không được để trống');
      return false;
    }
  }
  return true; // Không có lỗi
  
}
checkDuplicatePassengers4() {
  if (!this.nguoiDatVe.tenHanhKhach || !this.nguoiDatVe.soGiayTo || !this.nguoiDatVe.email || !this.nguoiDatVe.sdt) {
    // Tên hành khách, số giấy tờ và email không được bỏ trống
    console.log('Lỗi: Tên hành khách, số giấy tờ và email không được bỏ trống');
    return false;
  }
  
  return true; // Không có lỗi
}

checkDuplicatePassengers5() {
  if (!this.agreement) {
    // Checkbox chưa được chọn
    console.log('Lỗi: Checkbox chưa được chọn');
    return false;
  }
  return true; // Không có lỗi
}

goBack() {
  history.back();
}

}

