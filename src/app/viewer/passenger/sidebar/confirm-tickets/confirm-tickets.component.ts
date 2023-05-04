import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XacNhanThongTin } from 'src/app/domain/XacNhanThongTin';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-confirm-tickets',
  templateUrl: './confirm-tickets.component.html',
  styleUrls: ['./confirm-tickets.component.css']
})
export class ConfirmTicketsComponent {
xacnhanthongtin=new XacNhanThongTin();
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private machineService: MachineService

  ){
    this.route.queryParams.subscribe(params => {
      this.xacnhanthongtin = JSON.parse(params['data']);
    console.log(this.xacnhanthongtin);
    
    })

  }

  getTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.xacnhanthongtin.gheDaDat.length; i++) {
      total += this.xacnhanthongtin.gheDaDat[i].giaVe - 1000;
    }
    return total;
  }
}
