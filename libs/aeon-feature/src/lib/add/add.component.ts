import { Aeon } from '@aeon-state-examples/aeon-utils';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addAeon } from '../aeon.state';
import { AeonFormData } from '../form/form.component';

@Component({
  selector: 'aeon-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  constructor(private store: Store, private router: Router) {}

  submit(aeon: AeonFormData) {
    this.store.dispatch(addAeon({ aeon }));
    this.router.navigateByUrl('aeons');
  }
}
