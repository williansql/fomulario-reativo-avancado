export type SignalValidatorFn<T = any> = (value: T) => string | null;

export const ValidatorsSignal = {

  required: (message = 'Campo obrigatório'): SignalValidatorFn =>
    (value) => {
      if (value === null || value === undefined || value === '') {
        return message;
      }
      return null;
    },

  minLength: (min: number, message?: string): SignalValidatorFn<string> =>
    (value) => {
      if (!value || value.length < min) {
        return message ?? `Mínimo de ${min} caracteres`;
      }
      return null;
    },

  email: (message = 'Email inválido'): SignalValidatorFn<string> =>
    (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value) ? null : message;
    },

  pattern: (regex: RegExp, message = 'Formato inválido'): SignalValidatorFn =>
    (value) => {
      return regex.test(value) ? null : message;
    }
};
