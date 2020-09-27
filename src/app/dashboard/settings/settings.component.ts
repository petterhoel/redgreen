import { Component } from '@angular/core';
import { BuildStoreService } from '../build-store.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  buildsWithVisibility$ = combineLatest(
    [this.buildStore.builds$,
    this.buildStore.hiddenBuildIds$]
  ).pipe(
    map(([builds, hiddenIds]) =>
      builds.map(item =>
        ({
          id: item.id,
          show: !hiddenIds.includes(item.id)
        } as BuildWithVisibility)
      )
    )
  );
  constructor(private buildStore: BuildStoreService) {}

  toggleVisibility(id: string) {
    this.buildStore.toggleBuildVisibility(id);
  }

  showAll(): void {
    this.buildStore.showAll();
  }

  hideAll(): void {
    this.buildStore.hideAll();
  }

}
class BuildWithVisibility {
  id: string = '';
  show: boolean = true;
}
