import { Signal, WritableSignal } from '@angular/core';

export interface SignalField<T = any> {
  value: WritableSignal<T>;
  disabled: WritableSignal<boolean>;
  validators?: ((value: T) => string | null)[];
  errors: Signal<string[]>;
  valid: Signal<boolean>;
}

export type SignalForm<T> = {
  [K in keyof T]: SignalField<T[K]>;
} & {
  value: Signal<T>;
  valid: Signal<boolean>;
};
