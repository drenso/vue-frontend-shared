import {VueConstructor} from 'vue/types/vue';
import {RouterConfiguration, RouterInterface} from './router_types';
import defineProperty = Reflect.defineProperty;

type PathFunction = (value: string, params?: {}) => string;

export default function install(_vue: VueConstructor, config: RouterConfiguration) {
  if (!config) {
    throw new Error('Missing the required configuration object! Supply it when enabling this plugin!');
  }
  if (!config.router) {
    throw new Error('Missing the required Router object! Supply it when enabling this plugin!');
  }
  if (!config.routes) {
    throw new Error('Missing the required routes! Supply it when enabling this plugin!');
  }

  config.router.setRoutingData(config.routes);

  const pathFunction: PathFunction = (value, params) => {
    if (!value) {
      return '';
    }

    return config.router.generate(value, params);
  };

  defineProperty(_vue.prototype, '$sfRouter', {
    get(): RouterInterface {
      return config.router;
    },
  });

  if (config.registerGlobal === true) {
    defineProperty(_vue.prototype, '$sfPath', {
      get(): PathFunction {
        return pathFunction;
      },
    });
  }

  if (config.registerFilter !== false) {
    _vue.filter('path', pathFunction);
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $sfRouter: RouterInterface;
    readonly $sfPath: PathFunction;
  }
}

