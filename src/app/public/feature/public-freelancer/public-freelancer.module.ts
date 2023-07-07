import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicFreelancerRoutingModule } from './public-freelancer-routing.module';
import { PublicFreelancerComponent } from './public-freelancer.component';


@NgModule({
  declarations: [
    PublicFreelancerComponent
  ],
  imports: [
    CommonModule,
    PublicFreelancerRoutingModule
  ]
})
export class PublicFreelancerModule { }
