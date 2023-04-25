import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { NotificationVoucherDetailComponent } from './notification-voucher-detail/notification-voucher-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/notifications/all', pathMatch: 'full'
  },

  {
    path: '', component: NotificationsComponent,
    children: [
      { path: 'all', component: AllNotificationsComponent },
      { path: 'detail', component: NotificationVoucherDetailComponent },
    ]
  },

  {
    path: '**', redirectTo: '/notifications/all', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
