import { Component, OnInit, HostListener } from '@angular/core';
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
  nam: string = '2023';
  thang: number = 0;
  years: any[] = [];
  namThongKe: any[] = [];
  doanhThuResponse: any[] = [];
  doanhThuThangResponse: any[] = [];
  selectedYear: number;
  chart: Chart;
  soVe: number;
  doanhThu: any;
  doanhThuFilter: any;
  namResponse: any;
  thangResponse: number;
  doanhThuNam: any;
  doanhThuThangNam: any;
  showResult: boolean;
  showResult1: boolean;

  thangchart: any[] = [];
  doanhThuThang: any[] = [];

  constructor(

    private service: OtherAdminService
  ) {
    const currentYear = new Date().getFullYear();
    const startYear = 2012;

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit() {
    this.showResult = false;
    this.showResult1 = true;
    this.onNamChange();
    this.renderChart();
  }

  onNamChange() {
    // this.chart.destroy();

    if (this.nam && this.thang == 0) {
      this.showResult = false;
      this.showResult1 = true;
      this.service.getThongKeTrongNam(this.nam).subscribe(
        (data) => {
          this.doanhThuNam = data;
          console.log(this.doanhThuNam);
          this.doanhThu = this.doanhThuNam.doanhThu
          this.doanhThuFilter = this.doanhThu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
          this.soVe = this.doanhThuNam.soVe;
          this.namResponse = this.doanhThuNam.nam;
          if (!this.namThongKe.includes(this.namResponse)) {
            this.namThongKe.push(this.namResponse);
          }
          this.doanhThuResponse.push(this.doanhThu);
          console.log(this.years);
          console.log(this.doanhThuResponse);
          this.chart.destroy();
          this.renderChart();
          this.namResponse = this.nam;
          this.thangchart = [];
          this.doanhThuResponse = [];

          // Xử lý dữ liệu trả về từ AP
        },
        (error) => {
          // Xử lý lỗi khi gọi API
          alert("Không có dữ liệu")
          this.doanhThuFilter = '';
          this.soVe = 0;
          this.doanhThuResponse = [];
          this.namResponse = this.nam
          this.chart.destroy();
          this.renderChart()

        }
      );
    }
  }
 
  onThangNamChange() {
    if (this.nam && this.thang !=0) {
      this.showResult = true;
      this.showResult1 = false;
      this.service.getThongKeThangTrongNam(this.nam, this.thang).subscribe(
        (data) => {
          this.doanhThuThangNam = data;
          this.doanhThu = this.doanhThuThangNam.doanhThu;
          this.doanhThuFilter = this.doanhThu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
          this.soVe = this.doanhThuThangNam.soVe;
          this.namResponse = this.doanhThuThangNam.nam;
          this.thangResponse = this.doanhThuThangNam.thang;
          if (!this.thangchart.includes(this.thangResponse)) {
            this.thangchart.push(this.thangResponse);
            console.log(this.thangchart);
            
          }
          if (this.doanhThuThangNam.thang == this.thang) {
            this.doanhThuResponse.push(this.doanhThu);
            console.log(this.doanhThuResponse);
            
          }
          this.chart.destroy();
          this.renderChart1();
          // this.chart.update();
          this.namResponse = this.nam;
          this.thangchart = [];
          this.doanhThuResponse = [];
        },
        (error) => {
          // Xử lý lỗi khi gọi API
          alert("Không có dữ liệu")
          this.doanhThuFilter = '';
          this.soVe = 0;
          this.doanhThuResponse = [];
          this.chart.destroy();
          this.renderChart1()
        }
      );
    } else if( this.nam && this.thang == 0){
      this.onNamChange();
    }
  }
  renderChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('columnChart1');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Không tìm thấy ngữ cảnh vẽ hợp lệ.");
      return;
    }
    const data = {

      labels: this.namThongKe, // Ngày trong tháng
      datasets: [
        {
          label: 'Tổng doanh thu', // Doanh thu
          data: this.doanhThuResponse, // Dữ liệu doanh thu
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
  renderChart1() {
    const canvas = <HTMLCanvasElement>document.getElementById('columnChart2');
    const ctx1 = canvas.getContext('2d');
    if (!ctx1) {
      console.error("Không tìm thấy ngữ cảnh vẽ hợp lệ.");
      return;
    }
    const data = {

      labels: this.thangchart, // Ngày trong tháng
      datasets: [
        {
          label: 'Tổng doanh thu', // Doanh thu
          data: this.doanhThuResponse, // Dữ liệu doanh thu
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

    this.chart = new Chart(ctx1, {
      type: 'bar',
      data: data,
      options: options
    });
  }

}
