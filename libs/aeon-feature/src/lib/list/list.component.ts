import { Aeon } from '@aeon-state-examples/aeon-utils';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteAeon, selectAeons } from '../aeon.state';

@Component({
  selector: 'aeon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  aeons$ = this._store.pipe(select(selectAeons));
  constructor(private _store: Store) {}

  delete(aeon: Aeon) {
    this._store.dispatch(deleteAeon({ aeon }));
  }
}
