import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ClarityModule, ConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and message', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    component.isOpen = true;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector('.modal-title');
    const messageElement = fixture.debugElement.nativeElement.querySelector('.modal-body p');

    expect(titleElement.textContent).toContain('Test Title');
    expect(messageElement.textContent).toContain('Test Message');
  });

  it('should emit confirmed event when confirm button is clicked', () => {
    spyOn(component.confirmed, 'emit');
    component.isOpen = true;
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.nativeElement.querySelector('.btn-primary');
    confirmButton.click();

    expect(component.confirmed.emit).toHaveBeenCalled();
  });

  it('should emit closed event when modal close icon is clicked', () => {
    spyOn(component.closed, 'emit');
    component.close();
    expect(component.closed.emit).toHaveBeenCalled();
  });
});
