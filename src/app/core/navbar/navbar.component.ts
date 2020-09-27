import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly menuState = new BehaviorSubject<MenuVisibility>({
    layoutDirection: 'column',
    menuVisible: false
  });
  menuState$ = this.menuState.asObservable();
  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    if (event.target) {
      this.adjustMenu();
    }
  }

  private adjustMenu(): void {
    const largeScreen = window.innerWidth > this.MOBILE_BREAKPOINT;
    const { menuVisible, layoutDirection  } = this.menuState.value;
    if (!largeScreen && menuVisible && layoutDirection === `column`) {
      return
    }
    this.menuState.next({
      menuVisible: largeScreen ,
      layoutDirection: largeScreen ? `row` : `column`
    })
  }

  toggleVisiblility(): void {
    const { layoutDirection, menuVisible  } = this.menuState.value;
    if (layoutDirection === `row`) {
      return;
    }
    this.menuState.next({
      layoutDirection,
      menuVisible: !menuVisible
    })
  }

  ngOnInit(): void {
    this.adjustMenu();
  }
}

interface MenuVisibility {
  layoutDirection: `column`  | `row`;
  menuVisible: boolean;
}
