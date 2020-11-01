import { Component } from '@angular/core';

@Component({
  selector: 'app-lets-see',
  templateUrl: './lets-see.component.html',
  styleUrls: ['./lets-see.component.scss']
})
export class LetsSeeComponent {
  weHaveSwitch(input: string): string {
    switch (input) {
      case 'a':
        return 'b'
      case 'b':
        return 'c';
      default:
        return 'å';
    }
  }
}
