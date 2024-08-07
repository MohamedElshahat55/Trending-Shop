import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategotyRoutingModule } from './categoty-routing.module';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, CategotyRoutingModule],
  exports: [CategoryComponent],
})
export class CategotyModule {}
