import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DanhSachGheRequest } from 'src/app/domain/DanhSachGheRequest';
import { DanhSachGheResponse } from 'src/app/domain/DanhSachGheResponse';
import { DanhSachToaRequest } from 'src/app/domain/DanhSachToaRequest';
import { DanhSachToaResponse } from 'src/app/domain/DanhSachToaResponse';
import { gheDaDat } from 'src/app/domain/GheDaDat';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';
import { ToaTau } from 'src/app/domain/ToaTau';
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
  gheDaDat =new gheDaDat();
  gheDaDatLoad:gheDaDat;
  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService) { }
  ngOnChanges() {
    this.gheDaDatList=this.gheDaDatList;
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
    const tauInfo = this.dataSearch.find(item => item.id == id);
    this.dataSearchLoadToa = tauInfo;
    this.danhSachToaRequest.tauID = this.dataSearchLoadToa.tau.id;
    this.machineService.getDanhSachToa(this.danhSachToaRequest).subscribe(data => {
      this.toaXeList = data;
      const tauInfo = this.toaXeList.find(item => item.soToa == id);
      this.tauInfo = tauInfo;
      console.log(tauInfo);
      console.log(this.toaXeList);
      
     
      
      
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

    // this.loadToaGhe(event, )
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
      console.log(this.danhSachGheResponse);
      
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
      console.log(this.danhsachToaResponseKhuHoi); 
    })
  }
  loadThongTinGioVe(event:any, id:string, soGhe:string){
  console.log(this.danhsachToaResponse); 
    // this.gheDaDat.tenToa = this.tauInfo.tenTau;
    // this.gheDaDat.gaDi = this.dataSearch[0].gaDi;
    // this.gheDaDat.gaDen =this.dataSearch[0].gaDen;
    // this.gheDaDat.ngayDi = this.dataSearch[0].ngayDi;
    // this.gheDaDat.gioDi = this.dataSearch[0].gioDi;
    // this.gheDaDat.soToa = this.tauInfo.soToa;
    // this.gheDaDat.soGhe = soGhe;
    // this.selectedSeatId = id;
  
    const newGheDaDat = {
      tenTau: this.tauInfo.tenTau,
      gaDi: this.dataSearch[0].gaDi,
      gaDen: this.dataSearch[0].gaDen,
      ngayDi: this.dataSearch[0].ngayDi,
      gioDi: this.dataSearch[0].gioDi,
      soToa: this.danhsachToaResponse.soToa,
      soGhe: soGhe,
      selected: true,
      tenToa: this.tauInfo.tenToa,
    };
    const index = this.selectedSeats.indexOf(id);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(id);
    }
    if(Array.isArray(this.gheDaDatList) && this.gheDaDatList){
      this.gheDaDatList = [...this.gheDaDatList, newGheDaDat]; // sử dụng spread operator để sao chép mảng và thêm phần tử mới
      console.log(this.gheDaDatList);
    } else { 
      this.gheDaDatList = [newGheDaDat];
      console.log(this.gheDaDatList);
    }
  }

  btnDelete(soGhe:string){
    const index = this.selectedSeats.indexOf(soGhe);
    // console.log(index);
    
    this.gheDaDatList.splice(index, 1);
    // const updatedItem = Object.assign({}, this.gheDaDatList[index], { selected: false });
    // this.gheDaDatList[index] = updatedItem;
    console.log(index);
    this.selectedSeats.splice(index, 1);
  
    // Tìm phần tử có thuộc tính soGhe bằng với giá trị soGhe truyền vào
    const gheDaDat = this.gheDaDatList.find(ghe => ghe.soGhe === soGhe);
  
    if (gheDaDat) {
      gheDaDat.selected = false; // Set thuộc tính selected của phần tử này thành false
    }
    // this.gheDaDatList.forEach(ghes => {
    //   ghes.selected = false;
    // });
  }
  
  setTimeoutLoad(){
    const countdown = setInterval(() => {
      this.timeRemaining -= 1; // decrease the time remaining by 1 second

      if (this.timeRemaining <= 0) {
        clearInterval(countdown); // stop the countdown when time is up
      }
    }, 1000);
  }

  
}

