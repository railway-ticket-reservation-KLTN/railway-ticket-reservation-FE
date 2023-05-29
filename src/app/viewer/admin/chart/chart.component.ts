import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { OtherAdminService } from 'src/app/service/other-admin-service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: Chart;
  doanhThuTrongNam:any[];
  thang:any[];
  doanhThu:any[];

  constructor(
    private service: OtherAdminService
  ){

  }
  // ngOnInit() {
  //   this.renderChart();
  //   this.service.getDoanhThuTrongNam().subscribe(data =>{
  //       this.doanhThuTrongNam=data;

  //   })
  // }

  ngOnInit() {
    this.renderChart();
    this.service.getDoanhThuTrongNam().subscribe(data => {
      this.doanhThuTrongNam = data;
  
      this.thang = this.doanhThuTrongNam.map(item => item.thang); // Tạo mảng tháng
      this.doanhThu = this.doanhThuTrongNam.map(item => item.doanh_thu); // Tạo mảng doanh thu
  
      // Thêm mảng tháng vào mảng doanh thu
      const doanhThuMoi = [];
      for (let i = 0; i < this.thang.length; i++) {
        const doanhThuItem = {
          thang: this.thang[i],
          doanh_thu: this.doanhThu[i]
        };
        doanhThuMoi.push(doanhThuItem);
      }
  
      console.log(doanhThuMoi);
    });
  }
  

  renderChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('columnChart');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Không tìm thấy ngữ cảnh vẽ hợp lệ.");
      return;
    }
  
    const data = {
      labels: this.thang, // Ngày trong tháng
      datasets: [
        {
          label: 'Revenue', // Doanh thu
          data: this.doanhThu, // Dữ liệu doanh thu
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền cột
          borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cột
          borderWidth: 1
        }
      ]
    };

    const options: ChartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}