import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { selectAeonById } from '../aeon.state';

@Component({
  selector: 'aeon-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  aeon$ = this.activatedRoute.params.pipe(
    map((params) => params.id),
    switchMap((id) => this.store.pipe(select(selectAeonById, { id })))
  );

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}
}
