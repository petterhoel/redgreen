import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { StatusIconComponent } from './status-icon/status-icon.component';

@NgModule({
  declarations: [TruncatePipe, StatusIconComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    ClipboardModule,
    StatusIconComponent
  ]
})
export class SharedModule { }
