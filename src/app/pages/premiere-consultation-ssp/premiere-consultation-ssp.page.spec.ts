import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiereConsultationSSPPage } from './premiere-consultation-ssp.page';

describe('PremiereConsultationSSPPage', () => {
  let component: PremiereConsultationSSPPage;
  let fixture: ComponentFixture<PremiereConsultationSSPPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiereConsultationSSPPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiereConsultationSSPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
