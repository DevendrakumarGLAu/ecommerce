import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayerComponent } from './main-layer.component';

describe('MainLayerComponent', () => {
  let component: MainLayerComponent;
  let fixture: ComponentFixture<MainLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
