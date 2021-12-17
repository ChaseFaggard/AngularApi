import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularApiProject';
  checked: boolean = false

  getMode() {
    return this.checked ? 'rgb(32, 32, 32)' : '#f7f7f7'
  }
}
