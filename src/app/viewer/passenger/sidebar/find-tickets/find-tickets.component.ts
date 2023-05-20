import { Component, OnInit } from '@angular/core';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';
import { MachineService } from 'src/app/service/machine-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/service/error-service.service';
import { VeTauInfo } from 'src/app/domain/VeTauInfo';
import { VeTauInfoKhuHoi } from 'src/app/domain/VeTauInfoKhuHoi';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find-tickets',
  templateUrl: './find-tickets.component.html',
  styleUrls: ['./find-tickets.component.css']
})
export class FindTicketsComponent implements OnInit {
  dataSearch = new VeTauInfo();
  dataSearchKhuHoi= new VeTauInfoKhuHoi();
  isCheck=true;
  minDate: string;
  machineSearch = new TimChuyenTauRequest();
  
  constructor(
    private machineService:MachineService,
    private router:Router,
    private errorService: ErrorService,
    private snackBar: MatSnackBar

  ){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  }
  ngOnInit(){
    this.machineSearch.loaiHanhTrinh ==="MOT_CHIEU"
  }
   enableRadio(){
    this.isCheck=true;
    this.machineSearch.ngayVe = this.machineSearch.ngayDi;
    this.machineSearch.loaiHanhTrinh = 'MOT_CHIEU';
   }
   enableRadioTwo(){
    this.isCheck=false;
    this.machineSearch.loaiHanhTrinh = 'KHU_HOI';
   }
  onSearch(){ 

    if(this.checkDuplicatePassengers4()){
      this.machineService.getHanhTrinhTau(this.machineSearch).subscribe(data => {
        if(Array.isArray(data) && data.length === 0){
            // alert("Không tìm thấy");
            this.snackBar.open('Không tìm thấy kết quả', 'Đóng', {
              duration: 2000, // Thời gian hiển thị (ms)
              verticalPosition: 'top', // Vị trí hiển thị
              panelClass: ['snack-bar-large'] 
            });
        }
        else if(Array.isArray(data) == true){
          this.dataSearch = data;
          this.router.navigate(['/ket-qua'], { queryParams: { data: JSON.stringify(this.dataSearch) } });
        }else{
         
          this.machineService.getHanhTrinhTauKhuHoi(this.machineSearch).subscribe(data => {
            this.dataSearchKhuHoi = data;
            if(Array.isArray( this.dataSearchKhuHoi.hanhTrinhDi) && this.dataSearchKhuHoi.hanhTrinhDi.length === 0){
              this.snackBar.open('Không tìm thấy kết quả', 'Đóng', {
                duration: 2000, // Thời gian hiển thị (ms)
                verticalPosition: 'top', // Vị trí hiển thị
                panelClass: ['snack-bar-large'] 
              });
          }else{
            this.dataSearchKhuHoi = data;
    
            console.log(data);
            this.router.navigate(['/ket-qua'], { queryParams: { data: JSON.stringify(this.dataSearchKhuHoi) } });
          }
            
          })
            
        }
          
      },
      (error) => {
        this.snackBar.open('Không tìm thấy kết quả', 'Đóng', {
          duration: 2000, // Thời gian hiển thị (ms)
          verticalPosition: 'top', // Vị trí hiển thị
          panelClass: ['snack-bar-large'] 
        });
      }
      );
    }else{
      alert("Thông tin tìm kiếm không được bỏ trống")
    }

  }
  formatNgayVe(date: string): string {
    let formattedDate = '';
    if (date) {
        const d = new Date(date);
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        const year = d.getFullYear();
        formattedDate = day + '-' + month + '-' + year;
    }
    return formattedDate;
}

checkDuplicatePassengers4() {
  if(this.machineSearch.loaiHanhTrinh ==="MOT_CHIEU"){
    if (!this.machineSearch.gaDen || !this.machineSearch.gaDi || !this.machineSearch.ngayDi || !this.machineSearch.ngayDi) {
      // Tên hành khách, số giấy tờ và email không được bỏ trống
      console.log('Lỗi: Tên hành khách, số giấy tờ và email không được bỏ trống');
      return false;
    }
  }
  else{
    if (!this.machineSearch.gaDen || !this.machineSearch.gaDi || !this.machineSearch.ngayDi || !this.machineSearch.ngayDi || !this.machineSearch.ngayVe) {
      // Tên hành khách, số giấy tờ và email không được bỏ trống
      console.log('Lỗi: Tên hành khách, số giấy tờ và email không được bỏ trống');
      return false;
    }
  }
  return true; // Không có lỗi
}

}
