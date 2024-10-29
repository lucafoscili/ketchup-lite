import type { KulDom } from '../kul-manager/kul-manager-declarations';
import type {
    GenericMap,
    GenericObject,
    KulComponent,
    KulComponentName,
} from '../../types/GenericTypes';
import { getAssetPath } from '@stencil/core';
import {
    KulThemeAttribute,
    KulThemeCSSVariables,
    KulThemeHSLValues,
    KulThemeJSON,
    KulThemeRGBValues,
} from './kul-theme-declarations';
import { themesJson } from './kul-theme-values';
import { RIPPLE_SURFACE_CLASS } from '../../variables/GenericVariables';

const DOM = document.documentElement as KulDom;

export class KulTheme {
    #MASTER_CUSTOM_STYLE = 'MASTER';
    cssVars: Partial<KulThemeCSSVariables>;
    isDarkTheme: boolean;
    list: KulThemeJSON;
    managedComponents: Set<KulComponent<KulComponentName>>;
    name: string;
    styleTag: HTMLStyleElement;

    constructor(list?: KulThemeJSON, name?: string) {
        this.cssVars = {};
        this.list = list ? list : themesJson;
        this.managedComponents = new Set();
        this.name = name ? name : 'silver';
        this.styleTag = DOM.querySelector('head').appendChild(
            document.createElement('style')
        );
    }

    #cssVariables = () => {
        const theme = this.list[this.name];

        const variables = theme.cssVariables;
        let css = '';

        Object.entries(variables).forEach(([key, val]) => {
            this.cssVars[key] = val;
            css += `${key}: ${val};`;

            if (key.includes('color')) {
                const { rgbValues, hue, saturation, lightness } =
                    this.colorCheck(val);
                const rgbKey = `${key}-rgb`;
                const hKey = `${key}-h`;
                const sKey = `${key}-s`;
                const lKey = `${key}-l`;

                this.cssVars[rgbKey] = rgbValues;
                this.cssVars[hKey] = hue;
                this.cssVars[lKey] = lightness;
                this.cssVars[sKey] = saturation;

                css += `${rgbKey}: ${rgbValues};`;
                css += `${hKey}: ${hue};`;
                css += `${lKey}: ${lightness};`;
                css += `${sKey}: ${saturation};`;
            }
        });

        return css;
    };

    #customStyle = () => {
        this.managedComponents.forEach(function (comp) {
            if (comp?.rootElement?.isConnected) {
                comp.refresh();
            }
        });
    };

    #font = () => {
        let fonts = '';
        const theme = this.list[this.name];

        if (theme.font?.length) {
            theme.font.forEach((f) => {
                const fontPath = getAssetPath(`./assets/fonts/${f}-Regular`);
                const fontFace = `@font-face{font-family:${f.split('-')[0].replace(/(?<!^)(?=[A-Z])/g, ' ')};src:url('${fontPath}.woff2')format('woff2'),url('${fontPath}.woff') format('woff');}`;
                fonts += fontFace;
            });
        }

        return fonts;
    };

    #icons = () => {
        const theme = this.list[this.name];

        const icons = theme.icons;
        let css = '';
        for (var key in icons) {
            if (icons.hasOwnProperty(key)) {
                const val = `url('${getAssetPath(
                    `./assets/svg/${icons[key]}.svg`
                )}') no-repeat center`;
                this.cssVars[key] = val;
                css += key + ': ' + val + ';';
            }
        }
        return css;
    };

    set = (name?: string, list?: KulThemeJSON) => {
        if (name) {
            this.name = name;
        }
        if (list) {
            this.list = list;
        }
        DOM.ketchupLite.debug.logs.new(
            this,
            'Setting theme to: ' + this.name + '.'
        );

        const theme = this.list?.[this.name];
        if (!theme) {
            DOM.ketchupLite.debug.logs.new(
                this,
                'Invalid theme name, falling back to default ("silver").'
            );
            this.name = 'silver';
        }

        this.isDarkTheme = theme.isDark;
        this.cssVars = {};

        this.styleTag.innerText = `
        ${this.#font()}
        :root[kul-theme="${this.name}"] {
        ${this.#cssVariables()}
        ${this.#icons()}
        }`;

        this.#customStyle();

        DOM.setAttribute('kul-theme', this.name);
        if (this.isDarkTheme) {
            DOM.removeAttribute(KulThemeAttribute.LIGHT);
            DOM.setAttribute(KulThemeAttribute.DARK, '');
        } else {
            DOM.removeAttribute(KulThemeAttribute.DARK);
            DOM.setAttribute(KulThemeAttribute.LIGHT, '');
        }
        document.dispatchEvent(new CustomEvent('kul-theme-change'));
    };

    getThemes = () => {
        const themes: Array<string> = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                themes.push(key);
            }
        }
        return themes;
    };

    refresh = () => {
        try {
            this.styleTag.innerText =
                ':root[kul-theme="' +
                this.name +
                '"]{' +
                this.#cssVariables() +
                this.#icons() +
                '}';
            this.#customStyle();
            DOM.ketchupLite.debug.logs.new(
                this,
                'Theme ' + DOM.getAttribute('kul-theme') + ' refreshed.'
            );
            document.dispatchEvent(new CustomEvent('kul-theme-refresh'));
        } catch (error) {
            DOM.ketchupLite.debug.logs.new(
                this,
                'Theme not refreshed.',
                'warning'
            );
        }
    };

    ripple = {
        setup: (el: HTMLElement) => {
            el.classList.add(RIPPLE_SURFACE_CLASS);
            el.dataset.cy = 'ripple';
        },
        trigger: (e: PointerEvent, el: HTMLElement) => {
            const rect = el.getBoundingClientRect();
            const parent = el.parentElement;
            const ripple = document.createElement('span');
            const parentComputedStyle = getComputedStyle(parent);

            const rippleX = e.clientX - rect.left - rect.width / 2;
            const rippleY = e.clientY - rect.top - rect.height / 2;

            el.style.borderRadius = parentComputedStyle.borderRadius;

            ripple.classList.add('ripple');
            ripple.style.width = `${rect.width}px`;
            ripple.style.height = `${rect.height}px`;
            ripple.style.background = parentComputedStyle.color;
            ripple.style.opacity = '0.225';
            ripple.style.left = `${rippleX}px`;
            ripple.style.top = `${rippleY}px`;

            el.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 500);
        },
    };

    register = (comp: KulComponent<KulComponentName>) => {
        this.managedComponents.add(comp);
    };

    unregister = (comp: KulComponent<KulComponentName>) => {
        this.managedComponents?.delete(comp);
    };

    setKulStyle = (comp: KulComponent<KulComponentName>) => {
        const styles: GenericObject = this.list[this.name].customStyles;
        let completeStyle = '';
        if (styles && styles[this.#MASTER_CUSTOM_STYLE]) {
            completeStyle += styles[this.#MASTER_CUSTOM_STYLE];
        }
        if (styles && styles[comp.rootElement.tagName]) {
            completeStyle += ' ' + styles[comp.rootElement.tagName];
        }
        if (comp.kulStyle) {
            completeStyle += ' ' + comp.kulStyle;
        }
        return completeStyle ? completeStyle : null;
    };

    colorContrast = (color: string) => {
        color = this.colorCheck(color).rgbColor;
        const colorValues: string[] = color.replace(/[^\d,.]/g, '').split(',');
        const brightness: number = Math.round(
            (parseInt(colorValues[0]) * 299 +
                parseInt(colorValues[1]) * 587 +
                parseInt(colorValues[2]) * 114) /
                1000
        );
        return brightness > 125 ? 'black' : 'white';
    };

    randomColor = (brightness: number) => {
        function randomChannel(brightness: number) {
            var r = 255 - brightness;
            var n = 0 | (Math.random() * r + brightness);
            var s = n.toString(16);
            return s.length == 1 ? '0' + s : s;
        }
        return (
            '#' +
            randomChannel(brightness) +
            randomChannel(brightness) +
            randomChannel(brightness)
        );
    };

    randomTheme = () => {
        let themes: string[] = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                if (key !== 'test' && key !== 'print') {
                    themes.push(key);
                }
            }
        }
        if (themes.length > 0) {
            let index = null;
            while (index === null || themes[index] === this.name) {
                index = Math.floor(Math.random() * Math.floor(themes.length));
            }
            this.set(themes[index]);
        } else {
            DOM.ketchupLite.debug.logs.new(
                this,
                "Couldn't set a random theme: no themes available!",
                'warning'
            );
        }
    };

    colorCheck = (color: string) => {
        if (color === 'transparent') {
            color = this.cssVars['--kul-background-color'];
            DOM.ketchupLite.debug.logs.new(
                this,
                'Received TRANSPARENT color, converted to ' +
                    color +
                    ' (theme background).'
            );
        }

        const altRgbRe = /R(\d{1,3})G(\d{1,3})B(\d{1,3})/;
        const altRgb = altRgbRe.test(color);
        if (altRgb) {
            const parts = color.match(altRgbRe);
            color = 'rgb(' + parts[1] + ',' + parts[2] + ',' + parts[3] + ')';
        }

        let isHex = color.substring(0, 1) === '#';
        const isHsl = color.substring(0, 3).toLowerCase() === 'hsl';
        const isRgb = color.substring(0, 3).toLowerCase() === 'rgb';

        if (!isHex && !isHsl && !isRgb) {
            const oldColor = color;
            color = this.codeToHex(color);
            isHex = color.substring(0, 1) === '#' ? true : false;
            DOM.ketchupLite.debug.logs.new(
                this,
                'Received CODE NAME color ' +
                    oldColor +
                    ', converted to ' +
                    color +
                    '.'
            );
        }

        let hexColor: string = null;
        let rgbColor: string = null;
        let hslColor: string = null;
        let hslValues: string = null;
        let hue: string = null;
        let lightness: string = null;
        let saturation: string = null;

        if (isHex || isHsl) {
            const oldColor: string = color;
            let rgbColorObj: KulThemeRGBValues = null;
            if (isHex) {
                hexColor = color;
                rgbColorObj = this.hexToRgb(color);
            } else {
                hslColor = color;
                const regexp: RegExp =
                    /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
                const hsl: string[] = regexp.exec(color).slice(1);
                hslValues = hsl[0] + ',' + hsl[1] + ',' + hsl[2];
                hue = hsl[0];
                saturation = hsl[2];
                lightness = hsl[1];
                const h: number = parseInt(hue.replace('deg', ''));
                const s: number = parseInt(saturation.replace('%', '')) / 100;
                const l: number = parseInt(lightness.replace('%', '')) / 100;
                rgbColorObj = this.hslToRgb(h, s, l);
            }
            try {
                color =
                    'rgb(' +
                    rgbColorObj.r +
                    ',' +
                    rgbColorObj.g +
                    ',' +
                    rgbColorObj.b +
                    ')';
                if (isHex) {
                    const hsl: KulThemeHSLValues = this.rgbToHsl(
                        rgbColorObj.r,
                        rgbColorObj.g,
                        rgbColorObj.b
                    );
                    hue = hsl.h.toString();
                    saturation = hsl.s.toString() + '%';
                    lightness = hsl.l.toString() + '%';
                    hslValues = hue + ',' + saturation + ',' + lightness;
                    hslColor = 'hsl(' + hslValues + ')';
                } else {
                    hexColor = this.rgbToHex(
                        rgbColorObj.r,
                        rgbColorObj.g,
                        rgbColorObj.b
                    );
                }
                DOM.ketchupLite.debug.logs.new(
                    this,
                    'Received HEX color ' +
                        oldColor +
                        ', converted to ' +
                        color +
                        '.'
                );
            } catch (error) {
                DOM.ketchupLite.debug.logs.new(
                    this,
                    'Invalid color: ' + color + '.'
                );
            }
        }

        let rgbValues = '';
        const values = color.match(
            /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
        );

        try {
            rgbValues = values[1] + ',' + values[2] + ',' + values[3];
            rgbColor = color;
        } catch (error) {
            DOM.ketchupLite.debug.logs.new(
                this,
                'Color not converted to rgb values: ' + color + '.'
            );
        }

        if (!hexColor) {
            try {
                hexColor = this.rgbToHex(
                    parseInt(values[1]),
                    parseInt(values[2]),
                    parseInt(values[3])
                );
            } catch (error) {
                DOM.ketchupLite.debug.logs.new(
                    this,
                    'Color not converted to hex value: ' + color + '.'
                );
            }
        }

        if (!hslColor || !hslValues) {
            try {
                const hsl: KulThemeHSLValues = this.rgbToHsl(
                    parseInt(values[1]),
                    parseInt(values[2]),
                    parseInt(values[3])
                );
                hue = hsl.h.toString();
                saturation = hsl.s.toString() + '%';
                lightness = hsl.l.toString() + '%';
                hslValues = hsl.h + ',' + hsl.s + '%,' + hsl.l + '%';
                hslColor = 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)';
            } catch (error) {
                DOM.ketchupLite.debug.logs.new(
                    this,
                    'Color not converted to hex value: ' + color + '.'
                );
            }
        }

        return {
            hexColor: hexColor,
            hslColor: hslColor,
            hslValues: hslValues,
            hue: hue,
            lightness: lightness,
            saturation: saturation,
            rgbColor: rgbColor,
            rgbValues: rgbValues,
        };
    };

    hexToRgb = (hex: string) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    hslToRgb = (h: number, s: number, l: number) => {
        if (h == undefined) {
            return { r: 0, g: 0, b: 0 };
        }

        let huePrime = h / 60;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

        huePrime = Math.floor(huePrime);
        let red: number, green: number, blue: number;

        if (huePrime === 0) {
            red = chroma;
            green = secondComponent;
            blue = 0;
        } else if (huePrime === 1) {
            red = secondComponent;
            green = chroma;
            blue = 0;
        } else if (huePrime === 2) {
            red = 0;
            green = chroma;
            blue = secondComponent;
        } else if (huePrime === 3) {
            red = 0;
            green = secondComponent;
            blue = chroma;
        } else if (huePrime === 4) {
            red = secondComponent;
            green = 0;
            blue = chroma;
        } else if (huePrime === 5) {
            red = chroma;
            green = 0;
            blue = secondComponent;
        }

        const lightnessAdjustment = l - chroma / 2;
        red += lightnessAdjustment;
        green += lightnessAdjustment;
        blue += lightnessAdjustment;
        return {
            r: Math.round(red * 255),
            g: Math.round(green * 255),
            b: Math.round(blue * 255),
        };
    };

    rgbToHex = (r: number, g: number, b: number) => {
        return (
            '#' + this.valueToHex(r) + this.valueToHex(g) + this.valueToHex(b)
        );
    };

    rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin;
        let h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;

        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return { h: h, s: s, l: l };
    };

    valueToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };

    codeToHex(color: string): string {
        const colorCodes: GenericMap = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#00ffff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000000',
            blanchedalmond: '#ffebcd',
            blue: '#0000ff',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#00ffff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgreen: '#006400',
            darkgrey: '#a9a9a9',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkslategrey: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#ff00ff',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            goldenrod: '#daa520',
            gold: '#ffd700',
            gray: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            grey: '#808080',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavenderblush: '#fff0f5',
            lavender: '#e6e6fa',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgreen: '#90ee90',
            lightgrey: '#d3d3d3',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#778899',
            lightslategrey: '#778899',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#00ff00',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#ff00ff',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370db',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#db7093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            rebeccapurple: '#663399',
            red: '#ff0000',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#ffffff',
            whitesmoke: '#f5f5f5',
            yellow: '#ffff00',
            yellowgreen: '#9acd32',
        };
        if (colorCodes[color.toLowerCase()]) {
            return colorCodes[color.toLowerCase()];
        } else {
            DOM.ketchupLite.debug.logs.new(
                this,
                'Could not decode color ' + color + '!'
            );
            return color;
        }
    }
}
