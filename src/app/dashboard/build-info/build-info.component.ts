import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BuildInfo } from '../model/build-info';

const defaultBuild: BuildInfo = {
  branchName: '',
  comment: '',
  commit: '',
  date: new Date(0),
  id: '',
  name: 'N/A',
  number: '',
  status: 'FAILURE',
  statusText: '',
  username: '',
};
@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildInfoComponent {
  @Input() build: BuildInfo = defaultBuild;
  open = false;
  toggleExpander(): void {
    this.open = !this.open;
  }
}
