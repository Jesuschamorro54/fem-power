import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';

import { NotificationsComponent } from './notifications.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';




@NgModule({
  declarations: [
    NotificationsComponent,
    AllNotificationsComponent,
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
  ]
})
export class NotificationsModule { }
