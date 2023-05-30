import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, LinearScale } from 'chart.js';
import 'chart.js/auto';
import { DoanhThuNam } from 'src/app/domain/admin/DoanhThuNam';
import { OtherAdminService } from 'src/app/service/other-admin-service';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {
  nam:string ='';
  thang:number = 0;
  years: number[] = [];
  selectedYear: number;
  chart: Chart;
  soVe:number;
  doanhThu:any ;
  namResponse:number;
  doanhThuNam : any;
  doanhThuThangNam : any;

  constructor(

    private service:OtherAdminService
  ){
    const currentYear = new Date().getFullYear();
    const startYear = 2012;

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit() {
    this.renderChart();
    this.onThangNamChange();
  }
  onNamChange() {
    if (this.nam) {
      this.service.getThongKeTrongNam(this.nam).subscribe(
        (data) => {
         this.doanhThuNam=data;
          console.log(this.doanhThuNam);
          this.doanhThu = this.doanhThuNam.doanhThu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
          this.soVe = this.doanhThuNam.soVe;
          this.namResponse = this.doanhThuNam.nam;
          console.log(this.doanhThu);
          // Xử lý dữ liệu trả về từ AP
        },
        (error) => {
          // Xử lý lỗi khi gọi API
          alert("Không có dữ liệu")
        }
      );
    }
  }

  onThangNamChange() {
    if (this.nam && this.thang) {
      this.service.getThongKeThangTrongNam(this.nam, this.thang).subscribe(
        (data) => {
         this.doanhThuThangNam=data;
          this.doanhThu = this.doanhThuThangNam.doanhThu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;;
          this.soVe = this.doanhThuThangNam.soVe;
          this.namResponse = this.doanhThuThangNam.nam;
          // Xử lý dữ liệu trả về từ AP
        },
        (error) => {
          // Xử lý lỗi khi gọi API
          alert("Không có dữ liệu")
        }
      );
    }
  }
  renderChart() {

    const canvas = <HTMLCanvasElement>document.getElementById('columnChart');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Không tìm thấy ngữ cảnh vẽ hợp lệ.");
      return;
    }
  

    const data = {

      labels: [1, 2], // Ngày trong tháng
      datasets: [
        {
          label: 'Tổng doanh thu', // Doanh thu
          data: [100,200], // Dữ liệu doanh thu
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền cột
          borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cột
          borderWidth: 1
        }
      ], 
    };

// Thêm giá trị doanh thu vào mảng data.datasets[0].data
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
