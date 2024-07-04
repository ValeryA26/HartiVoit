import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';
import { By } from '@angular/platform-browser';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent]
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

    const titleElement = fixture.debugElement.query(By.css('.modal-title')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('.modal-body p')).nativeElement;

    expect(titleElement.textContent).toBe('Test Title');
    expect(messageElement.textContent).toBe('Test Message');
  });

  it('should emit confirmed event when confirm button is clicked', () => {
    spyOn(component.confirmed, 'emit');
    component.isOpen = true;
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    confirmButton.click();

    expect(component.confirmed.emit).toHaveBeenCalled();
  });

  it('should emit closed event when close button is clicked', () => {
    spyOn(component.closed, 'emit');
    component.isOpen = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.btn-secondary')).nativeElement;
    closeButton.click();

    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should emit closed event when modal close icon is clicked', () => {
    spyOn(component.closed, 'emit');
    component.isOpen = true;
    fixture.detectChanges();

    const closeIconButton = fixture.debugElement.query(By.css('.close')).nativeElement;
    closeIconButton.click();

    expect(component.closed.emit).toHaveBeenCalled();
  });
});
