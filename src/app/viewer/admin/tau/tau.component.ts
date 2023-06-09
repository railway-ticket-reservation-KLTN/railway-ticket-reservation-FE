import { Component, OnInit, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemHanhTrinhRequest } from 'src/app/domain/admin/ThemHanhTrinhRequest';
import { MachineService } from 'src/app/service/machine-service.service';
import { OtherAdminService } from 'src/app/service/other-admin-service';
import { NgZone } from '@angular/core';
import { CustomFilterPipe } from 'src/app/service/custom-filter';

@Component({
  selector: 'app-tau',
  templateUrl: './tau.component.html',
  styleUrls: ['./tau.component.css'],
  providers: [CustomFilterPipe] // Thêm CustomFilterPipe vào providers

})
export class TauComponent implements OnInit  {
  page: number = 1;
  filteredHanhTrinh: any[];
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  HanhTrinh:any[];
  isError!:boolean;
  isErrorGioDi!:boolean;
  isErrorGiaVe!:boolean;
  isErrorGioDen!:boolean;
  isErrorGaDen!:boolean;
  filteredGaDi: string = '';
  filteredGaDen: string = '';
  filteredNgayDi: string = '';
  filteredNgayDen: string = '';
  Tau:any[]=[];
  searchText:string;
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
    private ngZone: NgZone,
    private customFilter:CustomFilterPipe,
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
  
  onTableDataChange(event: any) {
    this.page = event;
    this.loadData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadData();
  }
  filterData(filteredGaDi: string) {
    this.filteredHanhTrinh = this.HanhTrinh.filter(loads =>
      (loads.gaDi.includes(filteredGaDi))
    );
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
      this.hanhTrinhRequest1 = { ...loads, tau: { ...loads.tau } };
    } else {
        this.hanhTrinhRequest1 = {
          id:loads.id,
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
            soLuongToa:loads.tau.soLuongToa,
            toas:loads.tau.toas
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
   
    if(this.checkDuplicatePassengers()){
      let danhSachTau: any[] = [];
    
      console.log(this.hanhTrinhRequest);
  
      let tau: any = {
        "id":this.hanhTrinhRequest.id,
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
      
    }else{
      alert("Yêu cầu nhập đầy đủ thông tin")
    }
  }
  onCapNhatClick(){
      console.log(this.hanhTrinhRequest1);
      let tau: any = {
        "id":this.hanhTrinhRequest1.id,
        "gaDi": this.hanhTrinhRequest1.gaDi,
        "gaDen": this.hanhTrinhRequest1.gaDen,
        "ngayDi": this.hanhTrinhRequest1.ngayDi,
        "ngayDen": this.hanhTrinhRequest1.ngayDen,
        "gioDi": this.hanhTrinhRequest1.gioDi,
        "gioDen": this.hanhTrinhRequest1.gioDen,
        "trangThai": this.hanhTrinhRequest1.trangThai,
        "giaVe": this.hanhTrinhRequest1.giaVe,
        "tau": {
            "id": this.hanhTrinhRequest1.tau.id,
            "tenTau": this.hanhTrinhRequest1.tau.tenTau
        }
    };
      this.service.capNhatHanhTrinh(tau).subscribe(data =>{
        console.log(data);
        this.modalOpen1 = false;
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

  checkDuplicatePassengers(){
    if(!this.hanhTrinhRequest.gaDi || !this.hanhTrinhRequest.gaDen || !this.hanhTrinhRequest.ngayDi ||
      !this.hanhTrinhRequest.ngayDen || !this.hanhTrinhRequest.gioDi || !this.hanhTrinhRequest.gioDen || !this.hanhTrinhRequest.giaVe || !this.hanhTrinhRequest.tau
      ){
        return false;
      }
      return true;
  }
  // Trong thành phần TypeScript
applyFilter() {
  this.filteredHanhTrinh = this.HanhTrinh.filter((load: any) => {
    const search = this.searchText.toLowerCase();
    const matchTenTau = load.tau.tenTau.toLowerCase().includes(search);
    const matchGaDi = load.gaDi.toLowerCase().includes(search);
    const matchGaDen = load.gaDen.toLowerCase().includes(search);
    return matchTenTau || matchGaDi || matchGaDen;
  });
}
isLoadMatched(load: any): boolean {
  return this.filteredGaDi === '' || load.gaDi.toLowerCase().includes(this.filteredGaDi.toLowerCase());
}

  
}


