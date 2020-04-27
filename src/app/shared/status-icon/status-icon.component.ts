import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BuildStatus } from '../../build-status.enum';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusIconComponent {
  @Input() status: 'FAILURE' | 'SUCCESS' | '' = '';
  BuildStatus = BuildStatus;
}
