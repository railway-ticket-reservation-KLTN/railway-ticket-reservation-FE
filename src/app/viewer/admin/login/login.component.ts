import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DangNhap } from 'src/app/domain/DangNhap';
import { AdminService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  dangNhap=new DangNhap;
constructor(
  private service:AdminService,
  private router:Router,
){

}
  btnSubmit(){
    console.log(this.dangNhap);
    this.service.dangNhap(this.dangNhap).subscribe( data =>{
      this.router.navigate(['/home']);
    // if(data === null || data === ''){
    //   alert("Không tìm thấy")
    // }
    // else{
    //   this.router.navigate(['/home']);
    // }
   },error => {
    // Nếu có lỗi
    alert("Đã xảy ra lỗi. Vui lòng thử lại.");
  }
   );

  
    
  }
}
