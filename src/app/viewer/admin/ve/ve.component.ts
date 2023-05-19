import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtherAdminService } from 'src/app/service/other-admin-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-ve',
  templateUrl: './ve.component.html',
  styleUrls: ['./ve.component.css']
})
export class VeComponent implements OnInit {
  Ve: any[];
  maDatCho:string;
  selectedLoads: any[] = [];
  items: any[]; // Dữ liệu cần phân trang
  pageSize = 10; // Số mục hiển thị trên mỗi trang
  currentPage = 1; // Trang hiện tại
  totalItems: number; // Tổng số mục
  isShow = true;
  constructor(
    private service: OtherAdminService,
    private _dialog: MatDialog,
    private ngZone: NgZone
  ) {

  }
  ngOnInit() {
    this.service.getDanhSachVe().subscribe(data => {
      console.log(data);
      this.Ve = data;
      this.totalItems = this.Ve.length;
    }, (error) => {
      this.isShow = false;
      alert("Không có quyền truy cập")

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

  btnDatVe() {
    for(let i = 0; i<this.selectedLoads.length; i++){
      if(this.selectedLoads[i].tinhTrang == "CHUA_THANH_TOAN"){
          this.service.xacNhanDatVe(this.selectedLoads).subscribe(data =>{
            alert("Vé"+" "+this.selectedLoads[i].maVe+" "+ "Đặt thành công");
            this.ngZone.run(() => {
              // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
              this.loadData();
            });
            
            
          })
      }else{
        alert("Vé"+" "+this.selectedLoads[i].maVe+" "+ "không có quyền đặt");
      }
      
    }
  }
  btnTraVe() {
    for(let i = 0; i<this.selectedLoads.length; i++){
      if(this.selectedLoads[i].tinhTrang == "DA_MUA"){
          this.service.xacNhanTraVe(this.selectedLoads).subscribe(data =>{
            alert("Vé"+" "+this.selectedLoads[i].maVe+" "+ "trả thành công");
            this.ngZone.run(() => {
              // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
              this.loadData();
            });
          })
      }
      else{
        alert("Vé"+" "+this.selectedLoads[i].maVe+" "+ "không có quyền trả");
      }  
    }

  };

  // Hàm xử lý sự kiện chuyển trang
  onPageChange(event: number): void {
    this.currentPage = event;
  }
  loadData(){
  this.service.getDanhSachVe().subscribe(data => {
    console.log(data);
    this.Ve = data;
  });
}
  // Lấy dữ liệu từ nguồn nào đó và cập nhật totalItems
  btnSearch(){
    console.log(this.maDatCho);
    this.service.getDSMaDatCho(this.maDatCho).subscribe(data =>{
      console.log(data);
      
    });
    this.ngZone.run(() => {
      // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
      this.service.getDSMaDatCho(this.maDatCho).subscribe(data =>{
        this.Ve = data;
        
      });
    });
  }

}
