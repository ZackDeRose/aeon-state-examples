import { Aeon } from '@aeon-state-examples/aeon-utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { selectAeonById, updateAeon } from '../aeon.state';
import { AeonFormData } from '../form/form.component';

@Component({
  selector: 'aeon-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  aeon$ = this.activatedRoute.params.pipe(
    map((params) => params.id),
    switchMap((id) => this.store.pipe(select(selectAeonById, { id })))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  submit(aeonFormData: AeonFormData, aeon: Aeon) {
    this.store.dispatch(
      updateAeon({ aeon: { ...aeonFormData, name: aeon.name } })
    );
    this.router.navigateByUrl('aeons');
  }
}
