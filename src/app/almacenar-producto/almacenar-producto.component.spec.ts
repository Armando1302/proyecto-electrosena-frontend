import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenarProductoComponent } from './almacenar-producto.component';

describe('AlmacenarProductoComponent', () => {
  let component: AlmacenarProductoComponent;
  let fixture: ComponentFixture<AlmacenarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenarProductoComponent]
    });
    fixture = TestBed.createComponent(AlmacenarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
