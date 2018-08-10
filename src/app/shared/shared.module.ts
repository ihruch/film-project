import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SearchComponent } from './search/search.component';
import { ActorsService } from './services/actors.service';
import { FilmsService } from './services/films.service';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [ActorsService, FilmsService, AuthGuard]
})
export class SharedModule {}
