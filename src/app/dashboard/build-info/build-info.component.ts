import { Component, Input } from '@angular/core';
import { BuildInfo } from '../model/build-info';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.scss']
})
export class BuildInfoComponent {
  @Input() build: BuildInfo;
  open = false;

  toggleExpander(): void {
    console.log('hei');
    this.open = !open;
  }
}
