import {VueConstructor} from 'vue/types/vue';
import {MissingTranslationKeyCallback, Translator} from './translator';
import {MessageObject} from 'messageformat/messages';
import defineProperty = Reflect.defineProperty;

export interface TranslatorConfiguration {
  messages: MessageObject;
  missingKeyCallback?: MissingTranslationKeyCallback;
  registerGlobal?: boolean;
  registerFilter?: boolean;
}

type TransFunction = (value: any, params?: {}) => string;

export default function install(_vue: VueConstructor, config: TranslatorConfiguration) {
  if (!config || !config.messages) {
    throw new Error('Missing the required configuration object! Supply it when enabling this plugin!');
  }

  const translator = new Translator(config.messages, config.missingKeyCallback);

  const transFunction: TransFunction = (value, params?) => {
    if (!value) {
      return '';
    }

    return translator.trans(value, params);
  };

  defineProperty(_vue.prototype, '$translator', {
    get() {
      return translator;
    },
  });

  if (config.registerGlobal) {
    defineProperty(_vue.prototype, '$t', {
      get() {
        return transFunction;
      },
    });
  }

  if (config.registerFilter ?? true) {
    _vue.filter('trans', transFunction);
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $translator: Translator;
    readonly $t: TransFunction;
  }
}
