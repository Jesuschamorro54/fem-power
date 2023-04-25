import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-voucher-detail',
  templateUrl: './notification-voucher-detail.component.html',
  styleUrls: ['./notification-voucher-detail.component.scss']
})
export class NotificationVoucherDetailComponent implements OnInit {

  public info_donation: any;

  constructor() { }

  ngOnInit(): void {
    this.info_donation={
      state: "realizado",
      project: "Proyecto Mujer al mando del trigo",
      amount: 1200000,
      date: new Date,
      code: "SD42532",
      sponsor: "Telecaribe",
      addressee: "FUNDACIÓN SHE IS"
    }
  }
}
