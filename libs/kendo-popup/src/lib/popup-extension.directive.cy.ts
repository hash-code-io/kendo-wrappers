import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MountConfig } from 'cypress/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PopupExtensionDirective } from './popup-extension.directive';

const blackBoxStyle = 'style="width: 50px; height: 50px; background-color: black"';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test',
  template: `
    <button data-cy="button" #anchor (click)="show = !show">Click</button>
    <kendo-popup popupExtension (closeRequested)="show = false" [anchor]="anchor" *ngIf="show">
      <div data-cy="popup" ${blackBoxStyle}></div>
    </kendo-popup>
  `,
  imports: [PopupExtensionDirective, PopupModule, CommonModule],
})
export class TestComponent {
  public show = false;
}

const buttonSelector = '[data-cy=button]';
const bodySelector = 'body';
const popupSelector = '[data-cy=popup]';

const openPopup = (): void => {
  cy.get(popupSelector).should('not.exist');
  cy.get(buttonSelector).click();
  cy.get(popupSelector).should('be.visible');
};

describe(PopupExtensionDirective.name, () => {
  const config: MountConfig<TestComponent> = {
    imports: [NoopAnimationsModule],
  };

  it('closes on second button click', () => {
    cy.mount(TestComponent, config);

    openPopup();
    cy.get(buttonSelector).click();
    cy.get(popupSelector).should('not.exist');
  });

  it('closes on escape click', () => {
    cy.mount(TestComponent, config);

    openPopup();
    cy.get(bodySelector).trigger('keydown', { code: 'Escape' });
    cy.get(popupSelector).should('not.exist');
  });

  it('closes on outside click', () => {
    cy.mount(TestComponent, config);

    openPopup();
    cy.get(bodySelector).click();
    cy.get(popupSelector).should('not.exist');
  });
});
