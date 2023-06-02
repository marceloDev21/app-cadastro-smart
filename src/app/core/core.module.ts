import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, MenubarModule],
  providers: [],
})
export class CoreModule {}
