import {VueConstructor} from 'vue/types/vue';
import {capitalize, toLowercase, toUppercase, truncate} from './text';
import defineProperty = Reflect.defineProperty;

export default function install(_vue: VueConstructor) {
  defineProperty(_vue.prototype, '$lowercase', {
    get() {
      return toLowercase;
    },
  });
  _vue.filter('lowercase', toLowercase);

  defineProperty(_vue.prototype, '$uppercase', {
    get() {
      return toUppercase;
    },
  });
  _vue.filter('uppercase', toUppercase);

  defineProperty(_vue.prototype, '$capitalize', {
    get() {
      return capitalize;
    },
  });
  _vue.filter('capitalize', capitalize);

  defineProperty(_vue.prototype, '$truncate', {
    get() {
      return truncate;
    },
  });
  _vue.filter('truncate', truncate);
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $lowercase: typeof toLowercase;
    readonly $uppercase: typeof toUppercase;
    readonly $capitalize: typeof capitalize;
    readonly $truncate: typeof truncate;
  }
}
