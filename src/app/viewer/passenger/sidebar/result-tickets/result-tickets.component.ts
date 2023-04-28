import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DanhSachGheRequest } from 'src/app/domain/DanhSachGheRequest';
import { DanhSachGheResponse } from 'src/app/domain/DanhSachGheResponse';
import { DanhSachToaRequest } from 'src/app/domain/DanhSachToaRequest';
import { DanhSachToaResponse } from 'src/app/domain/DanhSachToaResponse';
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
export class ResultTicketsComponent implements OnInit {
  showResult = true;
  tauList: any[];
  tauListSearch: any[];
  hanhTrinhInfo: any;
  hanhTrinhInfoKhuHoi: any;
  toaXeList: any[];
  toaXeListKhuHoi: any[];
  DanhSachToaResponse: any[];
  dataSearch: any[];
  dataSearchVe: any[];
  dataSearchLoadToa = new VeTauInfo();
  dataSearchLoadToaKhuHoi = new VeTauInfo();
  dataSearchKhuHoi: any;
  isSelected: boolean;
  danhSachToaRequest = new DanhSachToaRequest();
  danhSachGheRequest = new DanhSachGheRequest;
  danhSachGheResponse: any[];
  danhSachGheToaResponse: any[];
  danhSachGheInfo = new DanhSachGheResponse();
  tauInfo = new ToaTau();
  tauInfoKhuHoi = new ToaTau();
  danhsachToaResponse = new DanhSachToaResponse();


  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dataSearch = JSON.parse(params['data']);
      if (Array.isArray(this.dataSearch) == true) {
        this.hanhTrinhInfo = this.dataSearch[0];
        this.showResult = true;
        const tauInfo = this.dataSearch.find(item => item.id == 1);
        this.tauInfo = tauInfo;
        this.loadToaTau(event, this.hanhTrinhInfo.id, this.hanhTrinhInfo.tau.id);
        this.loadToaGhe(event, this.hanhTrinhInfo.tau.toas[0].maToa, this.hanhTrinhInfo.tau.toas[0].soToa, this.hanhTrinhInfo.tau.toas[0].tenTau)
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
          
           // Khu hoi
          this.dataSearchVe = this.dataSearchKhuHoi.hanhTrinhVe;
          console.log(this.dataSearchVe);
          this.hanhTrinhInfoKhuHoi=this.dataSearchVe[0];
          console.log(this.hanhTrinhInfoKhuHoi);
          const tauInfoKhuHoi = this.dataSearchVe.find(item => item.id == 1);
          this.tauInfoKhuHoi = tauInfoKhuHoi;
          console.log(tauInfoKhuHoi);
          
        })
      }
    });
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
    })
  }
}

