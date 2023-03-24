import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { PostCarouselComponent } from './post-carousel/post-carousel.component';
import { SharedModule } from "../shared/shared.module";
import { RightMenuComponent } from './right-menu/right-menu.component';


@NgModule({
  declarations: [
    FeedComponent,
    LeftMenuComponent,
    PostCarouselComponent,
    RightMenuComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
  ]
})
export class FeedModule { }
