import { ModifierArgs } from 'ember-modifier/-private/interfaces';

// This is a temporary workaround for a change in the autotracking semantics of
// the args proxy introduced in `3.22`. What changed is that arguments are no
// longer eagerly consumed. Didn’t use an argument? Then updates won’t be run
// when its value changes.
//
// The goal of this function is to `get` each positional and named argument,
// thereby entangling it in autotracking and replicating the previous behaviour.
export function consumeArgs({ positional, named }: ModifierArgs): void {
  for (let i = 0; i < positional.length; i++) {
    positional[i];
  }

  Object.values(named);
}
