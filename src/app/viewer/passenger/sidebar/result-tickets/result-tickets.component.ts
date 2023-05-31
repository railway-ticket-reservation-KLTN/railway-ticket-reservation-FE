import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DanhSachGheRequest } from 'src/app/domain/DanhSachGheRequest';
import { DanhSachGheResponse } from 'src/app/domain/DanhSachGheResponse';
import { DanhSachToaRequest } from 'src/app/domain/DanhSachToaRequest';
import { DanhSachToaResponse } from 'src/app/domain/DanhSachToaResponse';
import { DatCho } from 'src/app/domain/DatCho';
import { gheDaDat } from 'src/app/domain/GheDaDat';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';
import { ToaTau } from 'src/app/domain/ToaTau';
import { TraCho } from 'src/app/domain/TraCho';
import { VeTauInfo } from 'src/app/domain/VeTauInfo';
import { VeTauInfoKhuHoi } from 'src/app/domain/VeTauInfoKhuHoi';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-result-tickets',
  templateUrl:'./result-tickets.component.html',
  styleUrls: ['./result-tickets.component.css']
})
export class ResultTicketsComponent implements OnInit, OnChanges {
  public timeRemaining = 600; // in seconds
  public selectedSeatId: string[] = [];
  public selectedSeats: string[] = [];
  show=true;
  giaVeTau:any;
  giaVeTauKhuHoi:any;
  showKhuHoi=true;
  selectedCarId: string;
  seat:any;
 
  index:any;
  modalOpen = false;
  showResult = true;
  tauList: any[];
  tauListSearch: any[];
  hanhTrinhInfo: any;
  hanhTrinhInfoKhuHoi: any;
  toaXeList: any[];
  toaXeListKhuHoi: any[];
  DanhSachToaResponse: any[];
  DanhSachToaResponseKhuHoi: any[];
  dataSearch: any[];
  dataSearchVe: any[];
  dataSearchLoadToa = new VeTauInfo();
  dataSearchLoadToaKhuHoi = new VeTauInfo();
  dataSearchKhuHoi: any;
  isSelected: boolean;
  danhSachToaRequest = new DanhSachToaRequest();
  danhSachGheRequest = new DanhSachGheRequest;
  danhSachGheResponse: DanhSachGheResponse[]=[];
  danhSachGheToaResponse: any[];
  danhSachGheResponseKhuHoi: any[];
  danhSachGheToaResponseKhuHoi: any[];
  danhSachGheInfo = new DanhSachGheResponse();
  tauInfo = new ToaTau();
  tauInfoKhuHoi = new ToaTau();
  danhsachToaResponse = new DanhSachToaResponse();
  danhsachToaResponseKhuHoi = new DanhSachToaResponse();
  gheDaDatList: gheDaDat[] = [];
  gheDaDatListKhuHoi: gheDaDat[] = [];
  gheDaDatList1: gheDaDat[];
  gheDaDat =new gheDaDat();
  gheDaDatLoad:gheDaDat;
  datCho=new DatCho();
  traCho=new TraCho();
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private machineService: MachineService) { }
  ngOnChanges() {
    

  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.dataSearch = JSON.parse(params['data']);
      if (Array.isArray(this.dataSearch) == true && this.dataSearch.length > 0) {
        this.hanhTrinhInfo = this.dataSearch[0];
        this.showResult = true;
        const tauInfo = this.dataSearch.find(item => item.id == 1);
        this.tauInfo = tauInfo;
        console.log(this.tauInfo);
        this.loadToaTau(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);
        // this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau);
        this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, 
          this.hanhTrinhInfo.tau.toas[0].tenTau);
        this.hanhTrinhInfoKhuHoi =[];
      }
      else {
        this.showResult = false;
        this.route.queryParams.subscribe(params => {
          this.dataSearchKhuHoi = JSON.parse(params['data']);
          this.dataSearch = this.dataSearchKhuHoi.hanhTrinhDi;
          this.hanhTrinhInfo = this.dataSearch[0];
          const tauInfo = this.dataSearch.find(item => item.id == 1);
          this.tauInfo = tauInfo;
          this.loadToaTau(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);
          // this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau);
          // this.loadToaTauKhuHoi(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);
          this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau, 
           );
           // Khu hoi
          this.dataSearchVe = this.dataSearchKhuHoi.hanhTrinhVe;
          console.log(this.dataSearchVe);
          this.hanhTrinhInfoKhuHoi=this.dataSearchVe[0];
          console.log(this.hanhTrinhInfoKhuHoi);
          const tauInfoKhuHoi = this.dataSearchVe.find(item => item.id == 1);
          this.tauInfoKhuHoi = tauInfoKhuHoi;
          console.log(tauInfoKhuHoi);
          this.loadToaTauKhuHoi(event,this.hanhTrinhInfoKhuHoi.id, this.hanhTrinhInfoKhuHoi.tau.id);
          this.loadToaGheKhuHoi(event, this.hanhTrinhInfoKhuHoi.tau.toas[0].maToa, this.hanhTrinhInfoKhuHoi.tau.toas[0].soToa, this.hanhTrinhInfoKhuHoi.tau.toas[0].tenTau);

        })
      }
    });
   this.setTimeoutLoad();
  }
  xuLiGiaVe(maToa:any, giaHanhTrinh:any) {
    switch (maToa) {
      case 1:
        this.giaVeTau = giaHanhTrinh;
        break;
      case 2:
        this.giaVeTau = giaHanhTrinh + 50000;
        break;
      case 3:
        this.giaVeTau = giaHanhTrinh + 100000;
        break;
      default:
        this.giaVeTau = 0;
        break;
    }
}

xuLyGiaVeKhuHoi(maToa:any, giaHanhTrinhKhuHoi:any) {
  switch (maToa) {
    case 1:
      this.giaVeTauKhuHoi = giaHanhTrinhKhuHoi;
      break;
    case 2:
      this.giaVeTauKhuHoi = giaHanhTrinhKhuHoi + 50000;
      break;
    case 3:
      this.giaVeTauKhuHoi = giaHanhTrinhKhuHoi + 100000;
      break;
    default:
      this.giaVeTauKhuHoi = 0;
      break;
  }
}
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }
  loadToaTau(event: any, id: string, soToa: string) {
    this.danhSachToaRequest.hanhTrinhID = id;
    const tauInfo1 = this.dataSearch.find(item => item.id == id);
    this.dataSearchLoadToa = tauInfo1;
    this.danhSachToaRequest.tauID = this.dataSearchLoadToa.tau.id;
    this.machineService.getDanhSachToa(this.danhSachToaRequest).subscribe(data => {
      this.toaXeList = data;
      const tauInfo = this.toaXeList.find(item => item.soToa <= id);
      this.tauInfo = tauInfo;
      this.loadToaGhe(event, this.tauInfo.maToa, this.tauInfo.soToa, this.tauInfo.tenTau);

    });
        
    // this.loadToaGhe(event,this.tauInfo.maToa, this.tauInfo.soToa, this.tauInfo.tenTau)
    
    // this.loadToaGhe(event,this.tauInfo.maToa, this.tauInfo.soToa, this.tauInfo.tenTau )
  }
  loadToaTauKhuHoi(event: any, id: string, soToa: string) {
    this.danhSachToaRequest.hanhTrinhID = id;
    const tauInfoKhuHoi = this.dataSearchVe.find(item => item.id == id);
    this.dataSearchLoadToaKhuHoi = tauInfoKhuHoi;
    this.danhSachToaRequest.tauID = this.dataSearchLoadToaKhuHoi.tau.id;
    this.machineService.getDanhSachToa(this.danhSachToaRequest).subscribe(data => {
      this.toaXeListKhuHoi = data;
      const tauInfoKhuHoi = this.toaXeListKhuHoi.find(item => item.soToa <= id);
      this.tauInfoKhuHoi = tauInfoKhuHoi;
      console.log(this.toaXeListKhuHoi);
      this.loadToaGheKhuHoi(event, this.tauInfoKhuHoi.maToa, this.tauInfoKhuHoi.soToa, this.tauInfoKhuHoi.tenTau);
    }); 
  }
  loadToaGhe(event: any, id: string, soToa: string, tenTau: string) {
    this.danhSachGheRequest.maToa = id;
    this.danhSachGheRequest.ngayDi = this.dataSearchLoadToa.ngayDi;
    this.danhSachGheRequest.soToa = soToa;
    this.danhSachGheRequest.tenTau = tenTau;
    this.danhSachGheRequest.gaDi = this.dataSearchLoadToa.gaDi
    this.danhSachGheRequest.gaDen = this.dataSearchLoadToa.gaDen;
    this.danhSachGheRequest.gioDi = this.dataSearchLoadToa.gioDi
    this.machineService.getDanhSachGhe(this.danhSachGheRequest).subscribe(data => {
      this.danhSachGheResponse = data;     
      this.xuLiGiaVe(this.danhSachGheRequest.maToa, this.hanhTrinhInfo.giaVe);       
      const gheInFo = this.toaXeList.find(item => item.soToa == soToa);
      this.danhsachToaResponse = gheInFo;      
    })
  }

  loadToaGheKhuHoi(event: any, id: string, soToa: string, tenTau: string) {
    this.danhSachGheRequest.maToa = id;
    this.danhSachGheRequest.ngayDi = this.dataSearchLoadToaKhuHoi.ngayDi;
    this.danhSachGheRequest.soToa = soToa;
    this.danhSachGheRequest.tenTau = tenTau;
    this.danhSachGheRequest.gaDi = this.dataSearchLoadToaKhuHoi.gaDi
    this.danhSachGheRequest.gaDen = this.dataSearchLoadToaKhuHoi.gaDen;
    this.danhSachGheRequest.gioDi = this.dataSearchLoadToaKhuHoi.gioDi
    this.machineService.getDanhSachGhe(this.danhSachGheRequest).subscribe(data => {
      this.danhSachGheResponseKhuHoi = data;
      this.xuLyGiaVeKhuHoi(this.danhSachGheRequest.maToa, this.hanhTrinhInfoKhuHoi.giaVe);
      const gheInFo = this.toaXeListKhuHoi.find(item => item.soToa == soToa);
      this.danhsachToaResponseKhuHoi = gheInFo;
      console.log(this.danhSachGheResponseKhuHoi); 
    })
  }
  loadThongTinGioVe(event:any, id:string, soGhe:string, maToa:string){
    const existingGheDaDat = this.gheDaDatList.find(ghe => ghe.maGhe === id);
    const existingGheDaDat1 = this.danhSachGheResponse.find(ghe => ghe.trangThai === '0');
    if (!existingGheDaDat && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length < 5) {
    this.show=false;
    this.datCho.gaDi = this.dataSearch[0].gaDi;
    this.datCho.gaDen =this.dataSearch[0].gaDen;
    this.datCho.soToa = this.danhsachToaResponse.soToa;
    this.datCho.maGhe = id;
    this.datCho.tenTau = this.tauInfo.tenTau;
    this.datCho.ngayDi = this.dataSearch[0].ngayDi;
    this.datCho.gioDi = this.dataSearch[0].gioDi;
    this.datCho.gioDen = this.dataSearch[0].gioDen;
    this.datCho.trangThai ="DAT_CHO";
      this.machineService.getDatCho(this.datCho).subscribe(data => {
        // Xử lý dữ liệu trả về từ API (nếu cần)
      });  
    } else {
      // Phần tử đã tồn tại trong mảng
      // Thực hiện xử lý khi phần tử bị trùng
      console.log('Phần tử đã tồn tại trong mảng');
    }    
    const newGheDaDat = {
      tenTau: this.tauInfo.tenTau,
      gaDi: this.dataSearch[0].gaDi,
      gaDen: this.dataSearch[0].gaDen,
      ngayDi: this.dataSearch[0].ngayDi,
      ngayDen:this.dataSearch[0].ngayDen,
      gioDi: this.dataSearch[0].gioDi,
      soToa: this.danhsachToaResponse.soToa,
      soGhe: soGhe,
      giaVe:this.giaVeTau,
      selected: true,
      tenToa: this.tauInfo.tenToa,
      trangThai:'DAT_CHO',
      gioDen: this.dataSearch[0].gioDen,
      maGhe:id,
      tenKhach:'',
      doiTuong:'',
      giayTo:'',
      loaiVe:'Một chiều',
    };    
    const index = this.selectedSeats.indexOf(id);
    const index1 = this.selectedSeats.indexOf(soGhe);
    if (index !== -1 && index1 !== -1 && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length >= 5) {
      this.selectedSeats.splice(index, 1);
      console.log(this.selectedSeats);
      
    } else if (!this.selectedSeats.includes(id)) {
      if(this.gheDaDatList.length + this.gheDaDatListKhuHoi.length < 5){
        this.selectedSeats.push(id);
      }
      
    }
    if(this.gheDaDatList && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length >= 5){
      alert("Mỗi khách chỉ được đặt 5 vé")
    }
    else if (Array.isArray(this.gheDaDatList)) {
      const existingGheDaDat = this.gheDaDatList.find(ghe => ghe.maGhe === newGheDaDat.maGhe);
      if (!existingGheDaDat) {
        this.gheDaDatList = [...this.gheDaDatList, newGheDaDat];
        this.gheDaDatList1 = this.gheDaDatList;
      }
    } else {
      this.gheDaDatList = [newGheDaDat];
      this.gheDaDatList1 = this.gheDaDatList;
      alert("Khách hàng chỉ được đặt tối đa 5 vé")
    }
    this.selectedCarId = id;
  }
  loadThongTinGioVeKhuHoi(event:any, id:string, soGhe:string){
    const existingGheDaDat = this.gheDaDatListKhuHoi.find(ghe => ghe.maGhe === id);
    if (!existingGheDaDat && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length < 5){
      this.showKhuHoi=false
      this.datCho.gaDi = this.dataSearchVe[0].gaDi;
      this.datCho.gaDen =this.dataSearchVe[0].gaDen;
      this.datCho.soToa = this.danhsachToaResponseKhuHoi.soToa;
      this.datCho.maGhe = id;
      this.datCho.tenTau = this.tauInfoKhuHoi.tenTau;
      this.datCho.ngayDi = this.dataSearchVe[0].ngayDi;
      this.datCho.gioDi = this.dataSearchVe[0].gioDi;
      this.datCho.gioDen = this.dataSearchVe[0].gioDen;
      this.datCho.trangThai ="DAT_CHO";
      this.machineService.getDatCho(this.datCho).subscribe(data =>{
        
      })
    }else {
      console.log('Phần tử đã tồn tại trong mảng');
    }    
 
   const newGheDaDatKhuHoi = {
     tenTau: this.tauInfoKhuHoi.tenTau,
     gaDi: this.dataSearchVe[0].gaDi,
     gaDen: this.dataSearchVe[0].gaDen,
     ngayDi: this.dataSearchVe[0].ngayDi,
     ngayDen:this.dataSearchVe[0].ngayDen,
     gioDi: this.dataSearchVe[0].gioDi,
     soToa: this.danhsachToaResponseKhuHoi.soToa,
     soGhe: soGhe,
     giaVe:this.giaVeTauKhuHoi,
     selected: true,
     tenToa: this.tauInfoKhuHoi.tenToa,
     trangThai:'DAT_CHO',
     gioDen: this.dataSearchVe[0].gioDen,
     maGhe:id,
     tenKhach:'',
     doiTuong:'',
     giayTo:'',
     loaiVe:'Khứ hồi',
   };
   const index = this.selectedSeatId.indexOf(id);
   const index1 = this.selectedSeatId.indexOf(soGhe);
   if (index !== -1 && index1 !==-1 && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length >= 5) {
     this.selectedSeatId.splice(index, 1);
   } else if(!this.selectedSeats.includes(id)) {
    if(this.gheDaDatListKhuHoi.length + this.gheDaDatList.length < 5){
      this.selectedSeatId.push(id);
    }
     
   }
  if(this.gheDaDatListKhuHoi && this.gheDaDatList.length + this.gheDaDatListKhuHoi.length >= 5){
    alert("Mỗi khách chỉ được đặt 5 vé")
  }
  else if (Array.isArray(this.gheDaDatListKhuHoi) && this.gheDaDatListKhuHoi) {
    const existingGheDaDat = this.gheDaDatListKhuHoi.find(ghe => ghe.maGhe === newGheDaDatKhuHoi.maGhe);
    if (!existingGheDaDat) {
      this.gheDaDatListKhuHoi = [...this.gheDaDatListKhuHoi, newGheDaDatKhuHoi];
    }
  } else {
    this.gheDaDatListKhuHoi = [newGheDaDatKhuHoi];
    alert("Khách hàng chỉ được đặt tối đa 5 vé")
  }
 }

  btnDelete(maGhe:string, soGhe:string, ){
   console.log(this.gheDaDatList);
   
    this.gheDaDatList.forEach((data) => {
      if (data.maGhe == maGhe) {
          this.traCho.gaDi = data.gaDi;
          this.traCho.gaDen = data.gaDen;
          this.traCho.soToa = data.soToa;
          this.traCho.maGhe = data.maGhe;
          this.traCho.tenTau = data.tenTau;
          this.traCho.ngayDi = data.ngayDi;
          this.traCho.gioDi = data.gioDi;
          this.traCho.gioDen = data.gioDen;
          this.traCho.trangThai = data.trangThai;
          console.log(this.traCho);
          this.index = this.selectedSeats.indexOf(maGhe);
          this.gheDaDatList.splice(this.index, 1);
          console.log(this.index);
          this.selectedSeats.splice(this.index, 1);
          this.machineService.traCho(this.traCho).subscribe(data =>{
    });
    
      }
  });
    
  }
  btnDeleteKhuHoi(maGhe:string, soGhe:string, ){
    
     this.gheDaDatListKhuHoi.forEach((data) => {
       if (data.maGhe == maGhe) {
           this.traCho.gaDi = data.gaDi;
           this.traCho.gaDen = data.gaDen;
           this.traCho.soToa = data.soToa;
           this.traCho.maGhe = data.maGhe;
           this.traCho.tenTau = data.tenTau;
           this.traCho.ngayDi = data.ngayDi;
           this.traCho.gioDi = data.gioDi;
           this.traCho.gioDen = data.gioDen;
           this.traCho.trangThai = data.trangThai;
           console.log(this.traCho);
           this.index = this.selectedSeatId.indexOf(maGhe);
           this.gheDaDatListKhuHoi.splice(this.index, 1);
           console.log(this.index);
           this.selectedSeatId.splice(this.index, 1);
           this.machineService.traCho(this.traCho).subscribe(data =>{
     });
     
       }
   });
     
   }
 
  setTimeoutLoad(){
    const countdown = setInterval(() => {
      this.timeRemaining -= 1; // decrease the time remaining by 1 second

      if (this.timeRemaining <= 0) {
        clearInterval(countdown); // stop the countdown when time is up
      }
    }, 1000);
  }
  getTotalItemCount(): number {
    return this.gheDaDatList.length + this.gheDaDatListKhuHoi.length;
}

  onSubmit(){
    if(this.gheDaDatList.length <=0 && this.gheDaDatListKhuHoi.length <=0 ){
      alert("Không có vé để mua")
    }
    else if(this.gheDaDatList.length + this.gheDaDatListKhuHoi.length > 5){
      alert("Mỗi khách chỉ đặt được tối đa 5 vé")
    }
    else{
      this.router.navigate(['/thanhtoan'], { queryParams: { data: JSON.stringify(this.gheDaDatList),
        gheDaDatListKhuHoi: JSON.stringify(this.gheDaDatListKhuHoi)
      } });
    }
   
  }
  
}

