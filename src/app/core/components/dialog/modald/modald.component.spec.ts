import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldComponent } from './modald.component';

describe('ModaldComponent', () => {
  let component: ModaldComponent;
  let fixture: ComponentFixture<ModaldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
