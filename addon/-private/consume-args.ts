import { ModifierArgs } from 'ember-modifier/-private/interfaces';

export function consumeArgs({ positional, named }: ModifierArgs): void {
  for (let i = 0; i < positional.length; i++) {
    positional[i];
  }

  Object.values(named);
}
