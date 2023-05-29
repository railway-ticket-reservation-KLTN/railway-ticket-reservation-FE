import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, LinearScale } from 'chart.js';
import 'chart.js/auto';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {

  years: number[] = [];
  selectedYear: number;

  constructor(){
    const currentYear = new Date().getFullYear();
    const startYear = 2012;

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit() {
    this.renderChart();
  }
  chart: Chart;

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
