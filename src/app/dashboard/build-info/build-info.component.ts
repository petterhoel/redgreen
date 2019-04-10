import { Component, Input } from '@angular/core';
import { BuildInfo } from '../model/build-info';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.scss']
})
export class BuildInfoComponent {
  private _build: BuildInfo;
  @Input() set build(info: BuildInfo) {
    this._build = info;
    this.open = info.status.toLowerCase() !== 'success';
  }

  get build(): BuildInfo {
    return this._build;
  }

  open = false;

  toggleExpander(): void {
    this.open = !this.open;
  }
}
