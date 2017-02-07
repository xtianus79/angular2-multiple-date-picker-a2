import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ui-main',
    templateUrl: 'ui.component.html',
    styleUrls: [ 'ui.component.css' ]
})
export class UiComponent {
    @Input() name: string;
  private _name: string;
  constructor() {}
}