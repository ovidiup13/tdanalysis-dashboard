import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesetStatsComponent } from './changeset-stats.component';

describe('ChangesetStatsComponent', () => {
  let component: ChangesetStatsComponent;
  let fixture: ComponentFixture<ChangesetStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangesetStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesetStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
