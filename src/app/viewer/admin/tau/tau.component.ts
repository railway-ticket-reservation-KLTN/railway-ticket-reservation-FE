import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemHanhTrinhRequest } from 'src/app/domain/admin/ThemHanhTrinhRequest';
import { MachineService } from 'src/app/service/machine-service.service';
import { OtherAdminService } from 'src/app/service/other-admin-service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-tau',
  templateUrl: './tau.component.html',
  styleUrls: ['./tau.component.css']
})
export class TauComponent implements OnInit {
  HanhTrinh:any[];
  Tau:any[]=[];
  isShow= true;
  modalOpen = false;
  modalOpen1 = false;
themHanhTrinh:any
  name:string;
  selectedValue: string;
  email:string;
  selectedLoads: any[] = [];
  hanhTrinhRequest =new  ThemHanhTrinhRequest;
  hanhTrinhRequest1 =new  ThemHanhTrinhRequest;
  minDate: string;
  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
    private serviceKH:MachineService,
    private ngZone: NgZone
  ) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  ngOnInit() {
    this.service.getDanhSachHanhTrinh().subscribe(data =>{
      console.log(data);
      this.HanhTrinh=data;
      
    },(error) => {
        this.isShow = false;
        alert("Không có quyền truy cập")
        
    });

    this.serviceKH.getToaTau().subscribe(data =>{
      this.Tau = data;
      console.log(this.Tau);
      
    })
  }

  btnDelete(){

    console.log(this.selectedLoads);

    if(this.selectedLoads.length > 0){
        this.service.xoaHanhTrinh(this.selectedLoads).subscribe(data =>{
          console.log(data); 
          this.selectedLoads =[];
          this.ngZone.run(() => {
            // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
            this.loadData();
            
          });       
        })
    }else{
      alert("Bạn cần chọn hành trình")
    }
    
  }
  btnAdd(){

  }
  btnEdit(){

  }
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  openModal1(loads:any) {
    this.modalOpen1 = true;
    console.log(loads);
    if (loads) {
      this.hanhTrinhRequest1 = { ...loads };
    } else {
        this.hanhTrinhRequest1 = {
          gaDi:loads.gaDi,
          gaDen:loads.gaDen,
          ngayDi:loads.ngayDi,
          ngayDen:loads.ngayDen,
          gioDi:loads.gioDi,
          gioDen:loads.gioDen,
          trangThai:loads.trangThai,
          giaVe:loads.gaDi,
          tau : {
            id:loads.tau.id,
            tenTau:loads.tau.tenTau,
          }
        }
    }
  }
  closeModal1() {
    this.modalOpen1 = false;
  }
  loadHanhTrinh(){
    this.service.getDanhSachHanhTrinh().subscribe(data =>{
      this.HanhTrinh=data;
    });
  }
  selectLoad(event: any, load: any) {
    load.isSelected = event.target.checked;

    if (load.isSelected) {
      this.selectedLoads.push(load);
    } else {
      const index = this.selectedLoads.indexOf(load);
      if (index > -1) {
        this.selectedLoads.splice(index, 1);
      }
    }
    console.log(this.selectedLoads);
  }

  onThemClick(){
    let danhSachTau: any[] = [];
    
    console.log(this.hanhTrinhRequest);

    let tau: any = {
      "gaDi": this.hanhTrinhRequest.gaDi,
      "gaDen": this.hanhTrinhRequest.gaDen,
      "ngayDi": this.hanhTrinhRequest.ngayDi,
      "ngayDen": this.hanhTrinhRequest.ngayDen,
      "gioDi": this.hanhTrinhRequest.gioDi,
      "gioDen": this.hanhTrinhRequest.gioDen,
      "trangThai": this.hanhTrinhRequest.trangThai,
      "giaVe": this.hanhTrinhRequest.giaVe,
      "tau": {
          "id": this.hanhTrinhRequest.tau.id,
          "tenTau": this.hanhTrinhRequest.tau.tenTau
      }
  };
    danhSachTau.push(tau);
    console.log(danhSachTau);

    this.service.themHanhTrinh(danhSachTau).subscribe(data =>{
      this.modalOpen = false;
      this.ngZone.run(() => {
        // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
        this.loadData();
      });
      
    })
    
  }

  loadData(){
    this.service.getDanhSachHanhTrinh().subscribe(data =>{
      console.log(data);
      this.HanhTrinh=data;
      
    });
  }
}
