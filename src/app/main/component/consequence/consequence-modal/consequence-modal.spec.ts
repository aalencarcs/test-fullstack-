import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsequenceModal } from './consequence-modal';

describe('ConsequenceModal', () => {
  let component: ConsequenceModal;
  let fixture: ComponentFixture<ConsequenceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsequenceModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsequenceModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
