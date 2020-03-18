import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LifecycleEvent } from './test-lifecycle-hooks/test-lifecycle-hooks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @ViewChild('events', { static: true }) eventsList: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.createCustomElement();
  }

  handleEvent(event: LifecycleEvent) {
    this.addEvent(event, this.eventsList.nativeElement);
  }

  private createCustomElement(): void {
    const ceContainer = document.getElementById('ceContainer');
    const ce = document.createElement('test-lifecycle-hooks-ce');
    ce['isCustom'] = true;

    const ceEvents = document.getElementById('ceEvents');
    ce.addEventListener('eventFired', $event => this.addEvent($event['detail'], ceEvents));

    ceContainer.appendChild(ce);
  }

  private addEvent(event: LifecycleEvent, listElement: HTMLElement): void {
    const li = document.createElement('li');
    li.innerText = `Event: ${JSON.stringify(event)}`;
    listElement.appendChild(li);
  }
}
