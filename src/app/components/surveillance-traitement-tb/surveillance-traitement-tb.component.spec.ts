import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveillanceTraitementTBComponent } from './surveillance-traitement-tb.component';

describe('SurveillanceTraitementTBComponent', () => {
  let component: SurveillanceTraitementTBComponent;
  let fixture: ComponentFixture<SurveillanceTraitementTBComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveillanceTraitementTBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveillanceTraitementTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
