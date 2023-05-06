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
  templateUrl: './result-tickets.component.html',
  styleUrls: ['./result-tickets.component.css']
})
export class ResultTicketsComponent implements OnInit, OnChanges {
  public timeRemaining = 600; // in seconds
  public selectedSeatId: string;
  public selectedSeats: string[] = [];

  // ticket = {
  //   tenToa : '',
  //   gaDi : '',
  //   gaDen : '',
  //   ngayDi :'',
  //   gioDi : '',
  //   soToa :  '',
  //   soGhe : '',
  // };
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
  danhSachGheResponse: DanhSachGheResponse[];
  danhSachGheToaResponse: any[];
  danhSachGheResponseKhuHoi: any[];
  danhSachGheToaResponseKhuHoi: any[];
  danhSachGheInfo = new DanhSachGheResponse();
  tauInfo = new ToaTau();
  tauInfoKhuHoi = new ToaTau();
  danhsachToaResponse = new DanhSachToaResponse();
  danhsachToaResponseKhuHoi = new DanhSachToaResponse();
  gheDaDatList: gheDaDat[];
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
        this.loadToaTau(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);
        this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau);
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
          this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau);
          // this.loadToaTauKhuHoi(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);

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

  loadToaTau(event: any, id: string, soToa: string) {
    this.danhSachToaRequest.hanhTrinhID = id;
    const tauInfo1 = this.dataSearch.find(item => item.id == id);
    this.dataSearchLoadToa = tauInfo1;
    this.danhSachToaRequest.tauID = this.dataSearchLoadToa.tau.id;
    this.machineService.getDanhSachToa(this.danhSachToaRequest).subscribe(data => {
      this.toaXeList = data;
      const tauInfo = this.toaXeList.find(item => item.soToa == soToa);
      this.tauInfo = tauInfo;
    });

    // this.loadToaGhe(event, )
  }
  loadToaTauKhuHoi(event: any, id: string, soToa: string) {
    this.danhSachToaRequest.hanhTrinhID = id;
    const tauInfoKhuHoi = this.dataSearchVe.find(item => item.id == id);
    this.dataSearchLoadToaKhuHoi = tauInfoKhuHoi;
    this.danhSachToaRequest.tauID = this.dataSearchLoadToaKhuHoi.tau.id;
    this.machineService.getDanhSachToa(this.danhSachToaRequest).subscribe(data => {
      this.toaXeListKhuHoi = data;
      const tauInfoKhuHoi = this.toaXeListKhuHoi.find(item => item.soToa == id);
      this.tauInfoKhuHoi = tauInfoKhuHoi;
      console.log(this.toaXeListKhuHoi);
      
      
    });
  }

  loadToaGhe(event: any, id: string, soToa: string, tenTau: string) {
    this.danhSachGheRequest.maToa = id;
    this.danhSachGheRequest.ngayDi = this.dataSearchLoadToa.ngayDi;
    this.danhSachGheRequest.soToa = soToa;
    this.danhSachGheRequest.tenTau = tenTau;
    this.machineService.getDanhSachGhe(this.danhSachGheRequest).subscribe(data => {
      this.danhSachGheResponse = data;
      const gheInFo = this.toaXeList.find(item => item.soToa == soToa);
      this.danhsachToaResponse = gheInFo;      
    })
  }

  loadToaGheKhuHoi(event: any, id: string, soToa: string, tenTau: string) {
    this.danhSachGheRequest.maToa = id;
    this.danhSachGheRequest.ngayDi = this.dataSearchLoadToaKhuHoi.ngayDi;
    this.danhSachGheRequest.soToa = soToa;
    this.danhSachGheRequest.tenTau = tenTau;
    this.machineService.getDanhSachGhe(this.danhSachGheRequest).subscribe(data => {
      this.danhSachGheResponseKhuHoi = data;
      const gheInFo = this.toaXeListKhuHoi.find(item => item.soToa == soToa);
      this.danhsachToaResponseKhuHoi = gheInFo;
      console.log(this.danhSachGheResponseKhuHoi); 
    })
  }
  loadThongTinGioVe(event:any, id:string, soGhe:string){
     //Một chiều
    this.datCho.gaDi = this.dataSearch[0].gaDi;
    this.datCho.gaDen =this.dataSearch[0].gaDen;
    this.datCho.soToa = this.danhsachToaResponse.soToa;
    this.datCho.maGhe = id;
    this.datCho.tenTau = this.tauInfo.tenTau;
    this.datCho.ngayDi = this.dataSearch[0].ngayDi;
    this.datCho.gioDi = this.dataSearch[0].gioDi;
    this.datCho.gioDen = this.dataSearch[0].gioDen;
    this.datCho.trangThai ="DAT_CHO";
    this.machineService.getDatCho(this.datCho).subscribe(data =>{
      
    })
    const newGheDaDat = {
      tenTau: this.tauInfo.tenTau,
      gaDi: this.dataSearch[0].gaDi,
      gaDen: this.dataSearch[0].gaDen,
      ngayDi: this.dataSearch[0].ngayDi,
      ngayDen:this.dataSearch[0].ngayDen,
      gioDi: this.dataSearch[0].gioDi,
      soToa: this.danhsachToaResponse.soToa,
      soGhe: soGhe,
      giaVe:this.dataSearch[0].giaVe,
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
    console.log(this.danhSachGheResponse);
    
    const index = this.selectedSeats.indexOf(id);
    const index1 = this.selectedSeats.indexOf(soGhe);

    if (index !== -1 && index1 !==-1 ) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(id);
    }
    if(Array.isArray(this.gheDaDatList) && this.gheDaDatList){
      this.gheDaDatList = [...this.gheDaDatList, newGheDaDat]; // sử dụng spread operator để sao chép mảng và thêm phần tử mới
      this.gheDaDatList1=this.gheDaDatList;
    } else { 
      this.gheDaDatList = [newGheDaDat];
      this.gheDaDatList1=this.gheDaDatList;

    }
  }
  loadThongTinGioVeKhuHoi(event:any, id:string, soGhe:string){
    //Một chiều
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
   const newGheDaDat = {
     tenTau: this.tauInfoKhuHoi.tenTau,
     gaDi: this.dataSearchVe[0].gaDi,
     gaDen: this.dataSearchVe[0].gaDen,
     ngayDi: this.dataSearchVe[0].ngayDi,
     ngayDen:this.dataSearchVe[0].ngayDen,
     gioDi: this.dataSearchVe[0].gioDi,
     soToa: this.danhsachToaResponseKhuHoi.soToa,
     soGhe: soGhe,
     giaVe:this.dataSearchVe[0].giaVe,
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
   const index = this.selectedSeats.indexOf(id);
   const index1 = this.selectedSeats.indexOf(soGhe);
   if (index !== -1 && index1 !==-1 ) {
     this.selectedSeats.splice(index, 1);
   } else {
     this.selectedSeats.push(id);
   }
   if(Array.isArray(this.gheDaDatList) && this.gheDaDatList){
     this.gheDaDatList = [...this.gheDaDatList, newGheDaDat]; // sử dụng spread operator để sao chép mảng và thêm phần tử mới
     this.gheDaDatList1=this.gheDaDatList;
   } else { 
     this.gheDaDatList = [newGheDaDat];
     this.gheDaDatList1=this.gheDaDatList;

   }
 }
  btnDelete(maGhe:string, soGhe:string, ){
    this.traCho.gaDi = this.dataSearch[0].gaDi;
    this.traCho.gaDen =this.dataSearch[0].gaDen;
    this.traCho.soToa = this.danhsachToaResponse.soToa;
    this.traCho.maGhe = maGhe;
    this.traCho.tenTau = this.tauInfo.tenTau;
    this.traCho.ngayDi = this.dataSearch[0].ngayDi;
    this.traCho.gioDi = this.dataSearch[0].gioDi;
    this.traCho.gioDen = this.dataSearch[0].gioDen;
    this.traCho.trangThai ="DAT_CHO";
    this.machineService.traCho(this.traCho).subscribe(data =>{
      console.log(data);
      
    });
    const index = this.selectedSeats.indexOf(soGhe);
    
    this.gheDaDatList.splice(index, 1);
    console.log(index);
    this.selectedSeats.splice(index, 1);
  
    // Tìm phần tử có thuộc tính soGhe bằng với giá trị soGhe truyền vào
    const gheDaDat = this.gheDaDatList.find(ghe => ghe.maGhe === soGhe);
  
    if (gheDaDat) {
      gheDaDat.selected = false; // Set thuộc tính selected của phần tử này thành false
    }
  }
  
  setTimeoutLoad(){
    const countdown = setInterval(() => {
      this.timeRemaining -= 1; // decrease the time remaining by 1 second

      if (this.timeRemaining <= 0) {
        clearInterval(countdown); // stop the countdown when time is up
      }
    }, 1000);
  }

  onSubmit(){
    this.router.navigate(['/thanhtoan'], { queryParams: { data: JSON.stringify(this.gheDaDatList) } });
  }
  
}

