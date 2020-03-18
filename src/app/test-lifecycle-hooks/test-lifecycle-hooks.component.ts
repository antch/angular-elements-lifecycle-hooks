import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'test-lifecycle-hooks',
  template: `<div>Value is: {{isCustom}}</div>`
})
export class TestLifeCycleHooksComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {

  @Input() isCustom: boolean;
  @Output() eventFired = new EventEmitter<LifecycleEvent>();

  ngOnInit() {
    this.eventFired.emit({ type: 'onInit' });
    this.logEvent('onInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.eventFired.emit({ type: 'onChanges', changes });
    this.logEvent('onChanges', changes);
  }

  ngAfterViewInit(): void {
    this.eventFired.emit({ type: 'afterViewInit' });
    this.logEvent('afterViewInit');
  }

  ngAfterContentInit(): void {
    this.eventFired.emit({ type: 'afterContentInit' });
    this.logEvent('afterContentInit');
  }

  private logEvent(eventType: LifecycleEventType, changes?: SimpleChanges): void {
    const componentType = this.isCustom ? 'Custom' : 'Native';
    console.log(`${componentType}: ${eventType}`, changes)
  }
}

export type LifecycleEventType = 'onInit' | 'onChanges' | 'afterViewInit' | 'afterContentInit';

export interface LifecycleEvent {
  type: LifecycleEventType,
  changes?: SimpleChanges
}