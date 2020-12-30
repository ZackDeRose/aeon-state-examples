import { Aeon } from '@aeon-state-examples/aeon-utils';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface AeonFormData {
  name: string;
  type1: string;
  type2: string;
  attack: number;
  defense: number;
  health: number;
}

export function convertAeonFromFormToAeon(
  inc: AeonFormData,
  ownerId = ''
): Aeon {
  const types = [inc.type1];
  if (inc.type2) {
    types.push(inc.type2);
  }
  return {
    name: inc.name,
    types,
    attack: inc.attack,
    defense: inc.defense,
    health: inc.health,
    ownerId,
  };
}

@Component({
  selector: 'aeon-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() aeon?: Aeon;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.aeon ? this.aeon.name : '', [
        Validators.required,
      ]),
      type1: new FormControl(this.aeon ? this.aeon.types[0] : ''),
      type2: new FormControl(this.aeon ? this.aeon.types[1] : ''),
      attack: new FormControl(this.aeon ? this.aeon.attack : 0),
      defense: new FormControl(this.aeon ? this.aeon.defense : 0),
      health: new FormControl(this.aeon ? this.aeon.health : 0),
    });
    if (this.aeon) {
      this.form.get('name').disable();
    }
  }
}
