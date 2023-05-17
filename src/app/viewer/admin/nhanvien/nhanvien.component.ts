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
  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
  ) {}
  ngOnInit() {
    this.service.getDanhSachTaiKhoan().subscribe(data =>{
      console.log(data);
      this.nhanVien=data;
      
    })
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

}
