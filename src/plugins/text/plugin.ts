import {VueConstructor} from 'vue/types/vue';
import {capitalize, toLowercase, toUppercase, truncate} from './text';
import defineProperty = Reflect.defineProperty;

export interface TextOptions {
  registerGlobal?: boolean;
  registerFilter?: boolean;
}

export default function install(_vue: VueConstructor, options?: TextOptions) {
  if (options && options.registerGlobal === true) {
    defineProperty(_vue.prototype, '$lowercase', {
      get() {
        return toLowercase;
      },
    });

    defineProperty(_vue.prototype, '$uppercase', {
      get() {
        return toUppercase;
      },
    });

    defineProperty(_vue.prototype, '$capitalize', {
      get() {
        return capitalize;
      },
    });

    defineProperty(_vue.prototype, '$truncate', {
      get() {
        return truncate;
      },
    });
  }

  if (!options || options.registerFilter !== false) {
    _vue.filter('lowercase', toLowercase);
    _vue.filter('uppercase', toUppercase);
    _vue.filter('capitalize', capitalize);
    _vue.filter('truncate', truncate);
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $lowercase: typeof toLowercase;
    readonly $uppercase: typeof toUppercase;
    readonly $capitalize: typeof capitalize;
    readonly $truncate: typeof truncate;
  }
}
