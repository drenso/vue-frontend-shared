import Big from 'big.js';
import {VueConstructor} from 'vue/types/vue';
import {formatter, formatter5, parseCurrency} from './currency';
import defineProperty = Reflect.defineProperty;

type CurrencyFunction = (value: string | number | Big) => string;

export default function install(_vue: VueConstructor) {
  const currencyFunction: CurrencyFunction = (value) => parseCurrency(value, formatter);
  const currency5Function: CurrencyFunction = (value) => parseCurrency(value, formatter5);

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

  _vue.filter('currency', currencyFunction);
  _vue.filter('currency5', currency5Function);
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $currency: CurrencyFunction;
    readonly $currency5: CurrencyFunction;
  }
}
