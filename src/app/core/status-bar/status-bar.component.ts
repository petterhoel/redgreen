import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BuildUpdateService } from '../build-update.service';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBarComponent {
  constructor(
    public updatedService: BuildUpdateService,
    public configService: ConfigService  ) {
  }
}
