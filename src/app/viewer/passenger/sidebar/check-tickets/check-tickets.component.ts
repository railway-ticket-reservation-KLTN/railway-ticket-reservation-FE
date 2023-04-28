import { Component, OnInit } from '@angular/core';
import { HanhTrinh } from 'src/app/domain/HanhTrinh';
import { KiemTraVeInfo } from 'src/app/domain/KiemTraVeInfo';
import { KiemTraVeRequest } from 'src/app/domain/KiemTraVeRequest';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-check-tickets',
  templateUrl: './check-tickets.component.html',
  styleUrls: ['./check-tickets.component.css']
})
export class CheckTicketsComponent implements OnInit {
  kiemTraVeInfo = new KiemTraVeInfo();
  hanhTrinhInfo = new HanhTrinh();
  kiemTraVeRequest = new KiemTraVeRequest();
  hidenSuccess = true;
  hidenError = true;
  showResult = true;
  gaDiError=true;
  gaDenError=true;
  macTauError=true;
  Error=true;
  constructor(
    private machineService: MachineService
  ) { }

  ngOnInit() {

  }


  async onSearch() {

 
    this.hidenError = true;
    this.hidenSuccess = true;
    this.showResult=true;
    this.machineService.getKiemTraVe(this.kiemTraVeRequest).subscribe(data => {
      this.kiemTraVeInfo = data;
      this.hidenSuccess = false;
      this.hanhTrinhInfo = data.hanhTrinh;
      this.showResult=false;
      console.log(this.kiemTraVeInfo);
    },
      (error) => {
        this.hidenError = false;
        this.showResult=true;
      })

  }
 
}
