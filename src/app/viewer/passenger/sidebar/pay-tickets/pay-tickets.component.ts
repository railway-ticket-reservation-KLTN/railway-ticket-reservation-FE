import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-tickets',
  templateUrl: './pay-tickets.component.html',
  styleUrls: ['./pay-tickets.component.css']
})
export class PayTicketsComponent implements OnInit {
  confirmationForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  private confirmationCode: string;

  ngOnInit(): void {
    this.confirmationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
      ticketCode: ['', Validators.required]
    });
  }

  
generateCode(): void {
  const randomNum = Math.floor(Math.random() * 1000000);
  this.confirmationCode = randomNum.toString().padStart(6, '0');
}

}
