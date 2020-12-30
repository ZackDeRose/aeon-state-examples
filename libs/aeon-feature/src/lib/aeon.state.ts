import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Aeon } from '@aeon-state-examples/aeon-utils';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { AeonFormData, convertAeonFromFormToAeon } from './form/form.component';

// Adapter
const aeonAdapter = createEntityAdapter<Aeon>({
  selectId: (x) => x.name,
});

// Actions
export const aeonAdded = createAction(
  '[Aeons API] Aeon Addded',
  props<{ aeon: Aeon }>()
);
export const aeonEditted = createAction(
  '[Aeons API] Aeon Updated',
  props<{ aeon: Aeon }>()
);
export const aeonDeleted = createAction(
  '[Aeons API] Aeon Deleted',
  props<{ name: string }>()
);
export const addAeon = createAction(
  '[Add Aeon Component] Submit New Aeon',
  props<{ aeon: AeonFormData }>()
);
export const updateAeon = createAction(
  '[Update Aeon Component] Submit Update Aeon',
  props<{ aeon: AeonFormData }>()
);
export const deleteAeon = createAction(
  '[Aeon List] Submit Delete Aeon',
  props<{ aeon: Aeon }>()
);

// Reducer
export const reducer = createReducer(
  aeonAdapter.getInitialState(),
  on(aeonAdded, (state, { aeon }) => aeonAdapter.addOne(aeon, state)),
  on(aeonEditted, (state, { aeon }) =>
    aeonAdapter.updateOne({ id: aeon.name, changes: aeon }, state)
  ),
  on(aeonDeleted, (state, { name }) => aeonAdapter.removeOne(name, state))
);

// Selectors
export const aeonFeatureSelector = createFeatureSelector<EntityState<Aeon>>(
  'aeons'
);
export const selectAeons = createSelector(
  aeonFeatureSelector,
  aeonAdapter.getSelectors().selectAll
);
const selectAeonEntities = createSelector(
  aeonFeatureSelector,
  aeonAdapter.getSelectors().selectEntities
);
export const selectAeonById = createSelector(
  selectAeonEntities,
  (entities: Dictionary<Aeon>, { id }: { id: string }) => entities[id]
);

// Effects
@Injectable()
export class AeonEffects {
  constructor(
    private _firestore: AngularFirestore,
    private _actions: Actions
  ) {}

  listeningToRealTimeUpdates$ = createEffect(() =>
    this._firestore
      .collection<Aeon>('aeons')
      .stateChanges()
      .pipe(
        switchMap((documentChanges) =>
          documentChanges.map((documentChange) =>
            documentChange.type === 'added'
              ? aeonAdded({
                  aeon: documentChange.payload.doc.data(),
                })
              : documentChange.type === 'modified'
              ? aeonEditted({
                  aeon: documentChange.payload.doc.data(),
                })
              : aeonDeleted({ name: documentChange.payload.doc.data().name })
          )
        )
      )
  );

  deleteAeonRequests$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(deleteAeon),
        tap(({ aeon }) =>
          this._firestore.collection<Aeon>('aeons').doc(aeon.name).delete()
        )
      ),
    { dispatch: false }
  );

  updateAeonRequests$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(updateAeon),
        map(({ aeon }) => convertAeonFromFormToAeon(aeon)),
        tap((aeon) =>
          this._firestore.collection<Aeon>('aeons').doc(aeon.name).update(aeon)
        )
      ),
    { dispatch: false }
  );

  addAeonRequest$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(addAeon),
        map(({ aeon }) => convertAeonFromFormToAeon(aeon)),
        tap((aeon) =>
          this._firestore.collection<Aeon>('aeons').doc(aeon.name).set(aeon)
        )
      ),
    { dispatch: false }
  );
}
