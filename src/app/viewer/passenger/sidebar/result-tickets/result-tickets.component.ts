import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';

@Component({
  selector: 'app-result-tickets',
  templateUrl: './result-tickets.component.html',
  styleUrls: ['./result-tickets.component.css']
})
export class ResultTicketsComponent implements OnInit {
  searchTerm:string;
  tauList=[];
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      // render danh sách chuyến tàu với searchTerm
      console.log(this.searchTerm);
      
    });
  }

}
