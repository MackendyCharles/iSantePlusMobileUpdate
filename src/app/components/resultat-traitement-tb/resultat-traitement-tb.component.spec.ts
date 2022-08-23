import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultatTraitementTBComponent } from './resultat-traitement-tb.component';

describe('ResultatTraitementTBComponent', () => {
  let component: ResultatTraitementTBComponent;
  let fixture: ComponentFixture<ResultatTraitementTBComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatTraitementTBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultatTraitementTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
