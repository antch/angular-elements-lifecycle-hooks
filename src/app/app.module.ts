import { NgModule, Injector, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { TestLifeCycleHooksComponent } from './test-lifecycle-hooks/test-lifecycle-hooks.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    TestLifeCycleHooksComponent
  ],
  entryComponents: [
    AppComponent,
    TestLifeCycleHooksComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(TestLifeCycleHooksComponent, { injector });
    customElements.define('test-lifecycle-hooks-ce', customElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
      appRef.bootstrap(AppComponent);
  }
}