import { capabilities } from '@ember/modifier';
import { gte } from 'ember-compatibility-helpers';
import { set } from '@ember/object';
import { destroy, registerDestructor } from '@ember/destroyable';

import ClassBasedModifier from './modifier';
import { ModifierArgs } from 'ember-modifier/-private/interfaces';
import { consumeArgs } from '../consume-args';

interface Factory {
  owner: unknown;
  class: typeof ClassBasedModifier;
}

function destroyModifier(modifier: ClassBasedModifier): void {
  modifier.willRemove();
  modifier.willDestroy();
}

class ClassBasedModifierManager322 {
  capabilities = capabilities('3.22');

  constructor(private owner: unknown) {}

  createModifier(
    Modifier: typeof ClassBasedModifier,
    args: ModifierArgs
  ): ClassBasedModifier {
    const modifier = new Modifier(this.owner, args);

    registerDestructor(modifier, destroyModifier);

    return modifier;
  }

  installModifier(
    instance: ClassBasedModifier,
    element: Element,
    args: ModifierArgs
  ): void {
    instance.element = element;

    consumeArgs(args);

    instance.didReceiveArguments();
    instance.didInstall();
  }

  updateModifier(instance: ClassBasedModifier, args: ModifierArgs): void {
    // TODO: this should be an args proxy
    set(instance, 'args', args);

    consumeArgs(args);

    instance.didUpdateArguments();
    instance.didReceiveArguments();
  }

  destroyModifier(instance: ClassBasedModifier): void {
    destroy(instance);
  }
}

class ClassBasedModifierManager313 {
  capabilities = capabilities('3.13');

  constructor(private owner: unknown) {}

  createModifier(factory: Factory, args: ModifierArgs): ClassBasedModifier {
    const Modifier = factory.class;

    const modifier = new Modifier(this.owner, args);

    registerDestructor(modifier, destroyModifier);

    return modifier;
  }

  installModifier(instance: ClassBasedModifier, element: Element): void {
    instance.element = element;

    instance.didReceiveArguments();
    instance.didInstall();
  }

  updateModifier(instance: ClassBasedModifier, args: ModifierArgs): void {
    // TODO: this should be an args proxy
    set(instance, 'args', args);

    instance.didUpdateArguments();
    instance.didReceiveArguments();
  }

  destroyModifier(instance: ClassBasedModifier): void {
    destroy(instance);
  }
}

const ClassBasedModifierManager = gte('3.22.0')
  ? ClassBasedModifierManager322
  : ClassBasedModifierManager313;

export default ClassBasedModifierManager;
