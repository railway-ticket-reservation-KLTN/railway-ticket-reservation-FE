import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { OtherAdminService } from 'src/app/service/other-admin-service';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
nhanVien:any[];
isShow=true;
modalOpen = false;

  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
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

  closeModal() {
    this.modalOpen = false;
  }

}
