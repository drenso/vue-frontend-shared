import moment, {Moment} from 'moment-timezone';
// @ts-ignore
import VueMoment from 'vue-moment';
import {VueConstructor} from 'vue/types/vue';
import {toApiISO} from './moment';
import defineProperty = Reflect.defineProperty;

export interface MomentOptions {
  default_tz?: string;
}

type MomentFunction = (value: any, format?: string) => string;

export default function install(_vue: VueConstructor, options?: MomentOptions) {
  options = options || {};
  if (options.default_tz) {
    moment.tz.setDefault(options.default_tz);
    // @ts-ignore
    if (!moment.defaultZone) {
      console.warn(`The supplied timezone ${options.default_tz} was not found found by moment!`);
    }
  }

  _vue.use(VueMoment, {
    moment,
  });

  const momentFilter = (defaultFormat: string): MomentFunction => {
    return (value: any, format?: string): string => {
      if (!value) {
        return '';
      }

      return moment(value).format(format || defaultFormat);
    };
  };

  const momentDatetime = momentFilter('YYYY-MM-DD HH:mm');
  defineProperty(_vue.prototype, '$momentDatetime', {
    get() {
      return momentDatetime;
    },
  });
  _vue.filter('moment_datetime', momentDatetime);

  const momentDatetimeWithSeconds = momentFilter('YYYY-MM-DD HH:mm:ss');
  defineProperty(_vue.prototype, '$momentDatetimeWithSeconds', {
    get() {
      return momentDatetimeWithSeconds;
    },
  });
  _vue.filter('moment_datetime_with_seconds', momentDatetimeWithSeconds);

  const momentDate = momentFilter('YYYY-MM-DD');
  defineProperty(_vue.prototype, '$momentDate', {
    get() {
      return momentDate;
    },
  });
  _vue.filter('moment_date', momentDate);

  const momentTime = momentFilter('HH:mm');
  defineProperty(_vue.prototype, '$momentTime', {
    get() {
      return momentTime;
    },
  });
  _vue.filter('moment_time', momentTime);

  const momentTimeWithSeconds = momentFilter('HH:mm:ss');
  defineProperty(_vue.prototype, '$momentTimeWithSeconds', {
    get() {
      return momentTimeWithSeconds;
    },
  });
  _vue.filter('moment_time_with_seconds', momentTimeWithSeconds);

  _vue.prototype.$momentToApiISO = toApiISO;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $moment: typeof moment;
    readonly $momentToApiISO: (moment: Moment) => string;
    readonly $momentDatetime: MomentFunction;
    readonly $momentDatetimeWithSeconds: MomentFunction;
    readonly $momentDate: MomentFunction;
    readonly $momentTime: MomentFunction;
    readonly $momentTimeWithSeconds: MomentFunction;
  }
}
