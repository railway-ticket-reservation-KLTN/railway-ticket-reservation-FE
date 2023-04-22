import { Component } from '@angular/core';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';
import { MachineService } from 'src/app/service/machine-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/service/error-service.service';
import { VeTauInfo } from 'src/app/domain/VeTauInfo';

@Component({
  selector: 'app-find-tickets',
  templateUrl: './find-tickets.component.html',
  styleUrls: ['./find-tickets.component.css']
})
export class FindTicketsComponent {
  dataSearch = new VeTauInfo();
  isCheck=true;
  minDate: string;
  machineSearch = new TimChuyenTauRequest();
  
  constructor(
    private machineService:MachineService,
    private router:Router,
    private errorService: ErrorService

  ){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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
    
  this.machineService.getHanhTrinhTau(this.machineSearch).subscribe(data => {
      this.dataSearch = data;
      this.router.navigate(['/ket-qua'], { queryParams: { data: JSON.stringify(this.dataSearch) } });
  },
  (error) => {
      alert('Không tìm thấy')
  }
  );
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
}
