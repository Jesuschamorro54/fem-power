import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from './shared/shared.module';
import { StaticFundationComponent } from './landing-pages/static-fundation/static-fundation.component';
import { StaticWomenComponent } from './landing-pages/static-women/static-women.component';
import { StaticHomeComponent } from './landing-pages/static-home/static-home.component';

@NgModule({
    declarations: [
        AppComponent,
        StaticFundationComponent,
        StaticWomenComponent,
        StaticHomeComponent,
        StaticHomeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
    ]
})
export class AppModule { }
