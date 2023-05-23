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
editedData:any
isShow=true;
modalOpen = false;
modalOpen1 = false;
themNhanVien= new ThemNhanVien;
themNhanVien1= new ThemNhanVien;;
tenNhanVien:string;
tenNhanVien1:string;
diaChi:string;
sdt:string;
viTri:string;
trangThai = 1;
diaChi1:string;
sdt1:string;
viTri1:string;
trangThai1 = 1;
selectedLoads: any[] = [];
nhanVienDelete:any;
  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
    private ngZone: NgZone
  ) {}
  ngOnInit() {
    this.service.getDanhSachTaiKhoan().subscribe(data =>{
      console.log(data);
      this.nhanVien=data;
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
  openModal1(loads:any) {
    this.modalOpen1 = true;    
    if (loads) {
      this.themNhanVien1 = { ...loads };
    } else {
      this.themNhanVien1 = {
        tenTaiKhoan: loads.tenTaiKhoan,
        matKhau: loads.matKhau,
        loaiTK:loads.loaiTK,
        trangThai:loads.trangThai,
        nhanVien:{
          tenNhanVien:loads.nhanVien.tenNhanVien,
          diaChi:loads.nhanVien.diaChi,
          sdt:loads.nhanVien.sdt,
          viTri:loads.nhanVien.viTri,
          trangThai:loads.nhanVien.trangThai
        }
        
        // Other properties
      };
    } 
  this.tenNhanVien1=this.themNhanVien1.nhanVien.tenNhanVien;
  this.diaChi1=this.themNhanVien1.nhanVien.diaChi;
  this.sdt1=this.themNhanVien1.nhanVien.sdt;
  this.viTri1=this.themNhanVien1.nhanVien.viTri;
  this.trangThai1=this.themNhanVien1.nhanVien.trangThai;
  }
  

  closeModal() {
    this.modalOpen = false;
  }
  closeModal1() {
    this.modalOpen1 = false;
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
  btnUpdate(){
  this.themNhanVien1.nhanVien.tenNhanVien=this.tenNhanVien1;
  this.themNhanVien1.nhanVien.diaChi=this.diaChi1;
  this.themNhanVien1.nhanVien.sdt=this.sdt1;
  this.themNhanVien1.nhanVien.viTri=this.viTri1;
  this.themNhanVien1.nhanVien.trangThai=this.trangThai1;

    console.log(this.themNhanVien1);
    this.service.capNhatTaiKhoan(this.themNhanVien1).subscribe(data =>{
      console.log(data);
      
    })

    let nhanvien: any = {
      "tenTaiKhoan":this.themNhanVien1.tenTaiKhoan,
      "matKhau":this.themNhanVien1.matKhau,
      "loaiTK":this.themNhanVien1.loaiTK,
      "trangThai":this.themNhanVien1.trangThai,
      "nhanVien":{
       
      }
    }
  }
}
