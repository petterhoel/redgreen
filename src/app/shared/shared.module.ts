import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    ClipboardModule,
  ]
})
export class SharedModule { }
