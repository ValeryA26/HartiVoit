import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientesComponent } from './clientes.component';
import { AuthService } from '../../core/auth.service';

describe('ClientesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientesComponent],
      providers: [AuthService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ClientesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
