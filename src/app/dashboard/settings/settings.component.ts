import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildStoreService } from '../build-store.service';
import { BuildInfo } from '../model/build-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  builds: BuildInfo[] = [];
  hiddenIds: string[] = [];
  buildSettings: BuildVisibility[] = [];
  buildSubscription: Subscription;
  hiddenIdSubscription: Subscription;
  constructor(private buildStore: BuildStoreService) {}
  ngOnInit() {
    this.getBuilds();
    this.getHiddenIds();
  }

  getBuilds(): void {
    this.buildSubscription = this.buildStore
      .getLatestBuilds()
      .subscribe(builds => {
        this.builds = builds;
        this.updateVisibilitySettings();
      });
  }

  getHiddenIds(): void {
    this.hiddenIdSubscription = this.buildStore
      .getHiddenIds()
      .subscribe(ids => {
        this.hiddenIds = ids;
        this.updateVisibilitySettings();
      });
  }

  ngOnDestroy(): void {
    if (this.buildSubscription) {
      this.buildSubscription.unsubscribe();
    }
  }

  toggleVisibility(id: string) {
    this.buildStore.toggleBuildVisibility(id);
  }

  updateVisibilitySettings(): void {
    this.buildSettings = this.builds.map(item => {
      return { id: item.id, show: !this.hiddenIds.includes(item.id) };
    });
  }
}

class BuildVisibility {
  id: string = '';
  show: boolean = true;
}
