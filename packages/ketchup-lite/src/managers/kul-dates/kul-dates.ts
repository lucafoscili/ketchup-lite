import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/pl';
import 'dayjs/locale/ru';
import 'dayjs/locale/zh';
import { KulGenericRootElement } from '../../types/GenericTypes';
import { KulDatesLocales, KulDatesNormalize } from './kul-dates-declarations';
export class KulDates {
  dayjs: Function;
  locale: KulDatesLocales;
  managedComponents: Set<KulGenericRootElement>;
  constructor(locale?: KulDatesLocales) {
    this.managedComponents = new Set();
    this.setLocale(locale);
    this.dayjs = dayjs;
    dayjs.extend(customParseFormat);
    dayjs.extend(localizedFormat);
    dayjs.extend(minMax);
  }
  setLocale(locale?: KulDatesLocales): string {
    if (locale) {
      // Sets locale from string
      this.locale = locale;
    } else {
      // Sets locale from browser
      const navLangs: false | readonly string[] =
        navigator.languages ||
        (navigator.language ? [navigator.language] : false);
      if (!navLangs || !navLangs.length) {
        return 'en';
      }
      this.locale = navLangs[0].split('-')[0].toLowerCase() as KulDatesLocales;

      let found = false;
      for (const key in KulDatesLocales) {
        if (Object.prototype.hasOwnProperty.call(KulDatesLocales, key)) {
          const localeItem = KulDatesLocales[key];
          if (localeItem == this.locale) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        this.locale = KulDatesLocales.ENGLISH;
      }
    }
    dayjs.locale(this.locale);
    this.managedComponents.forEach(function (comp) {
      if (comp.isConnected) {
        comp.refresh();
      }
    });
    document.dispatchEvent(new CustomEvent('kul-dates-localechange'));
  }
  getLocale(): string {
    return this.locale;
  }
  getLocales(): Array<KulDatesLocales> {
    const items: Array<KulDatesLocales> = Object.keys(KulDatesLocales)
      .map((key) => KulDatesLocales[key as keyof typeof KulDatesLocales])
      .filter((value) => typeof value === 'string');
    return items;
  }
  getDateFormat(): string {
    const formatObj = new Intl.DateTimeFormat(this.getLocale()).formatToParts(
      new Date(),
    );

    let dateFormat = formatObj
      .map((obj) => {
        switch (obj.type) {
          case 'day':
            return 'DD';
          case 'month':
            return 'MM';
          case 'year':
            return 'YYYY';
          default:
            return obj.value;
        }
      })
      .join('');
    return dateFormat;
  }
  getTimeFormat(manageSeconds: boolean): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    if (manageSeconds == true) {
      options.second = '2-digit';
    }
    const formatObj = new Intl.DateTimeFormat(
      this.getLocale() + '-u-hc-h23',
      options,
    ).formatToParts(new Date());
    let timeFormat = formatObj
      .map((obj) => {
        switch (obj.type) {
          case 'hour':
            return 'HH';
          case 'minute':
            return 'mm';
          case 'second':
            return 'ss';
          default:
            return obj.value;
        }
      })
      .join('');
    return timeFormat;
  }
  format(input: dayjs.ConfigType, format?: string): string {
    if (!format) {
      format = 'L'; // MM/DD/YYYY, DD/MM/YYYY depending on locale
    }
    return dayjs(input).format(format);
  }
  formatTime(time: Date, manageSeconds: boolean): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    if (manageSeconds == true) {
      options.second = '2-digit';
    }
    return time.toLocaleTimeString(this.getLocale() + '-u-hc-h23', options);
  }
  isValid(date: dayjs.ConfigType, format?: string, strict?: boolean): boolean {
    if (format && format != null) {
      return dayjs(date, format, strict).isValid();
    } else {
      return dayjs(date, undefined, strict).isValid();
    }
  }
  toDate(input: dayjs.ConfigType, format?: string): Date {
    if (format && format != null) {
      return dayjs(input, format).toDate();
    } else {
      return dayjs(input).toDate();
    }
  }
  toDayjs(input: dayjs.ConfigType, format?: string): dayjs.Dayjs {
    if (format) {
      return dayjs(input, format);
    } else {
      return dayjs(input);
    }
  }
  normalize(input: string, type?: KulDatesNormalize): dayjs.Dayjs {
    const l = dayjs.Ls[this.locale].formats.L;
    // array e for-each con contains
    const allowedChars: Array<string> = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];
    let inputCleaned = '';
    for (let i = 0; i < input.length; i++) {
      let ch: string = input.charAt(i);
      if (allowedChars.includes(ch)) {
        inputCleaned += ch;
      }
    }
    input = inputCleaned;
    switch (type) {
      case KulDatesNormalize.TIME:
        const time = normalizeTime();
        return dayjs(time);
      case KulDatesNormalize.TIMESTAMP:
        return dayjs(input);
      case KulDatesNormalize.DATE:
      default:
        const date = normalizeDate();
        return dayjs(date);
    }

    function normalizeDate(): Date {
      const today = new Date();
      const dIndex = l.indexOf('DD');
      const mIndex = l.indexOf('MM');
      let sub1 = 0,
        sub2 = 0,
        year = '';
      switch (input.length) {
        case 1:
        case 2:
          sub1 = parseInt(input);
          today.setDate(sub1);
          break;
        case 3:
        //input = '0' + input; // continue into case 4
        case 4:
          sub1 = parseInt(input.substring(0, 2));
          sub2 = parseInt(input.substring(2, 4));
          if (mIndex === 0) {
            today.setDate(sub2);
            today.setMonth(sub1 - 1); // -1 because it's 0 based
          } else if (dIndex === 0) {
            today.setDate(sub1);
            today.setMonth(sub2 - 1); // -1 because it's 0 based
          }
          break;
        case 5:
        //input = '0' + input; // continue into case 6
        case 6:
          sub1 = parseInt(input.substring(0, 2));
          sub2 = parseInt(input.substring(2, 4));
          year = today.getFullYear().toString();
          year = year.substring(0, 2) + input.substring(4);
          if (mIndex === 0) {
            today.setFullYear(parseInt(year), sub1 - 1, sub2);
          } else if (dIndex === 0) {
            today.setFullYear(parseInt(year), sub2 - 1, sub1);
          }
          break;
        case 7:
        //input = '0' + input; // continue into case 8
        case 8:
          sub1 = parseInt(input.substring(0, 2));
          sub2 = parseInt(input.substring(2, 4));
          year = input.substring(4);
          if (mIndex === 0) {
            today.setFullYear(parseInt(year), sub1 - 1, sub2);
          } else if (dIndex === 0) {
            today.setFullYear(parseInt(year), sub2 - 1, sub1);
          }
          break;
        default:
          break;
      }
      return today;
    }

    function normalizeTime(): Date {
      const today = new Date();
      let hh = 0,
        mm = 0,
        ss = 0,
        ms = 0;
      switch (input.length) {
        case 1:
        case 2:
          hh = parseInt(input);
          today.setHours(hh, 0, 0, 0);
          break;
        case 3:
        //input = '0' + input; // continue into case 4
        case 4:
          hh = parseInt(input.substring(0, 2));
          mm = parseInt(input.substring(2, 4));
          today.setHours(hh, mm, 0, 0);
          break;
        case 5:
        //input = '0' + input; // continue into case 6
        case 6:
          hh = parseInt(input.substring(0, 2));
          mm = parseInt(input.substring(2, 4));
          ss = parseInt(input.substring(4, 6));
          today.setHours(hh, mm, ss, 0);
          break;
        case 7:
        //input = '0' + input; // continue into case 8
        case 8:
          hh = parseInt(input.substring(0, 2));
          mm = parseInt(input.substring(2, 4));
          ss = parseInt(input.substring(4, 6));
          ms = parseInt(input.substring(6, 8));
          today.setHours(hh, mm, ss, ms);
          break;
        default:
          break;
      }
      return today;
    }
  }
  min(dates: dayjs.ConfigType[]): dayjs.Dayjs {
    const dayjsDates: dayjs.Dayjs[] = [];
    for (let index = 0; index < dates.length; index++) {
      const date: dayjs.ConfigType = dates[index];
      dayjsDates.push(dayjs(date));
    }
    return dayjs.min(dayjsDates);
  }
  max(dates: dayjs.ConfigType[]): dayjs.Dayjs {
    const dayjsDates: dayjs.Dayjs[] = [];
    for (let index = 0; index < dates.length; index++) {
      const date: dayjs.ConfigType = dates[index];
      dayjsDates.push(dayjs(date));
    }
    return dayjs.max(dayjsDates);
  }
  add(
    input: dayjs.ConfigType,
    value: number,
    unit?: dayjs.ManipulateType,
  ): dayjs.Dayjs {
    return dayjs(input).add(value, unit);
  }
  subtract(
    input: dayjs.ConfigType,
    value: number,
    unit?: dayjs.ManipulateType,
  ): dayjs.Dayjs {
    return dayjs(input).subtract(value, unit);
  }
  register(component: any): void {
    this.managedComponents.add(
      component.rootElement ? component.rootElement : component,
    );
  }
  unregister(component: any): void {
    if (this.managedComponents) {
      this.managedComponents.delete(
        component.rootElement ? component.rootElement : component,
      );
    }
  }
}
