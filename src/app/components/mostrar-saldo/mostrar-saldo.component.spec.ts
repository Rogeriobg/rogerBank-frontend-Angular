import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarSaldoComponent } from './mostrar-saldo.component';

describe('MostrarSaldoComponent', () => {
  let component: MostrarSaldoComponent;
  let fixture: ComponentFixture<MostrarSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
