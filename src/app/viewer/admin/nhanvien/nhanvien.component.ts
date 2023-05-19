import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { OtherAdminService } from 'src/app/service/other-admin-service';
import { ThemNhanVien } from 'src/app/domain/admin/ThemNhanVien';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
nhanVien:any[];
isShow=true;
modalOpen = false;
themNhanVien=new ThemNhanVien;
tenNhanVien:string;
diaChi:string;
sdt:string;
viTri:string;
trangThai = 1;
selectedLoads: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
    private ngZone: NgZone
  ) {}
  ngOnInit() {
    this.service.getDanhSachTaiKhoan().subscribe(data =>{
      console.log(data);
      this.nhanVien=data;
      console.log(this.nhanVien);
      
      
    },(error) => {
      this.isShow = false;
      alert("Không có quyền truy cập")
      
  });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getEmployeeList();
        }
      },
    });
  }
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
  btnThem(){

    this.themNhanVien.nhanVien ={
      tenNhanVien:this.tenNhanVien,
      sdt:this.sdt,
      diaChi:this.diaChi,
      viTri:this.viTri,
      trangThai:this.trangThai,
      
    }
    this.service.themTaiKhoan(this.themNhanVien).subscribe(data =>{
      console.log(data);
      this.ngZone.run(() => {
        // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
        this.loadData();
        this.modalOpen = false;
      });       
      
    })   
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

  loadData(){
    this.service.getDanhSachTaiKhoan().subscribe(data =>{
      this.nhanVien=data;
      console.log(this.nhanVien); 
    })
  }
  btnDelete(){
    if(this.selectedLoads.length > 0){
      this.service.xoaTaiKhoan(this.selectedLoads).subscribe(data =>{
        console.log(data);
        this.ngZone.run(() => {
          // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
          this.loadData();
        });     
      })
    }
    else{
      alert("Bạn cần chọn để xóa")
    }
    
  }

}
