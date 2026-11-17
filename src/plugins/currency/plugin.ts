import Big from 'big.js';
import {VueConstructor} from 'vue/types/vue';
import {formatter, formatter5, parseCurrency} from './currency';
import defineProperty = Reflect.defineProperty;

export interface CurrencyOptions {
  registerGlobal?: boolean;
  registerFilter?: boolean;
}

type CurrencyFunction = (value: string | number | Big) => string;

export default function install(_vue: VueConstructor, options: CurrencyOptions) {
  const currencyFunction: CurrencyFunction = (value) => parseCurrency(value, formatter);
  const currency5Function: CurrencyFunction = (value) => parseCurrency(value, formatter5);

  if (options?.registerGlobal) {
    defineProperty(_vue.prototype, '$currency', {
      get() {
        return currencyFunction;
      },
    });

    defineProperty(_vue.prototype, '$currency5', {
      get() {
        return currency5Function;
      },
    });
  }

  if (options?.registerFilter ?? true) {
    _vue.filter('currency', currencyFunction);
    _vue.filter('currency5', currency5Function);
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $currency: CurrencyFunction;
    readonly $currency5: CurrencyFunction;
  }
}
