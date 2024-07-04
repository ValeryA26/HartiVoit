import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VentasComponent } from './ventas.component';
import { AuthService } from '../../core/auth.service';

describe('VentasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, VentasComponent],
      providers: [AuthService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(VentasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
