import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandinRoutingModule } from './landin-routing.module';
import { StaticFundationComponent } from './static-fundation/static-fundation.component';
import { StaticWomenComponent } from './static-women/static-women.component';
import { StaticHomeComponent } from './static-home/static-home.component';
import { LandinComponent } from './landin.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
      StaticFundationComponent,
      StaticWomenComponent,
      StaticHomeComponent,
      LandinComponent,
    ],
    imports: [
      CommonModule,
      LandinRoutingModule,
      SharedModule
    ]
})
export class LandinModule { }
