import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SharedModule {}
