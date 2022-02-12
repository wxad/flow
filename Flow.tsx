import React, { useEffect, memo } from 'react';

export interface IFlow extends IBaseObject {
  className: string;
  as?: keyof JSX.IntrinsicElements;
  flowProperties?: string[];
}

const TITLE = 'wxad-flow-style-sheet';
const PROPERTIES = {
  w: ['width'],
  h: ['height'],
  text: ['font-size'],
  leading: ['line-height'],
  m: ['margin'],
  mx: ['margin-right', 'margin-left'],
  my: ['margin-top', 'margin-bottom'],
  mt: ['margin-top'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  ml: ['margin-left'],
  p: ['padding'],
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  pl: ['padding-left'],
  'translate-x': ['--un-translate-x'],
  '-translate-x': ['--un-translate-x']
};

/**
 * 专为原子类打造，将原子类名转化为流动类名，在渲染时动态增加 CSS 规则：
 * 900:text-24 1280:text-36 -> font-size_24-36_900-1280
 * 900:text-24 1280:text-36 1920:text-42 -> font-size_24-36-42_900-1280-1920
 *
 * 优先使用 clamp，在不支持的情况下使用 media-query
 */
const Flow: React.FC<IFlow> = ({ className, as = 'div', flowProperties, ...othersProps }) => {
  // get chrome version from userAgent
  const { userAgent } = navigator;
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/);
  const chromeVersionNumber = chromeVersion ? parseInt(chromeVersion[1], 10) : 0;
  const TAG = as;

  if (chromeVersionNumber < 79) {
    return <TAG className={className} {...othersProps} />;
  }
  // 注意正则 /\d*:[\S]*/g 匹配的是以数字开头：
  const responsives = className.match(/\d*:[\S]*/g) || [];
  const classNamesToRemove: string[] = [];
  const rulesExtracted: { [key: string]: string[] } = {};
  if (responsives.length) {
    const properties: Set<keyof typeof PROPERTIES> = new Set();
    responsives.forEach((o) => {
      const splitted = o.split(':')[1].split('-');
      const p = splitted.slice(0, splitted.length - 1).join('-') as keyof typeof PROPERTIES;
      if (flowProperties?.length) {
        if (flowProperties.includes(p)) {
          properties.add(p);
        }
      } else if (PROPERTIES[p]) {
        properties.add(p);
      }
    });

    properties.forEach((p) => {
      const res = responsives
        .filter((o) => o.includes(p))
        .sort((a, b) => parseInt(a.split(':')[0], 10) - parseInt(b.split(':')[0], 10));

      if (res.length === 2) {
        classNamesToRemove.push(...res);
        classNamesToRemove.push(res[0].split(':')[1]);
      }

      const screens = res.map((o) => o.split(':')[0]);
      const values = res.map(
        (o) =>
          `${p.startsWith('-') ? '-' : ''}${
            o.split('-')[o.split('-').length - 1].match(/[\d|.]+/g)?.[0]
          }`
      );

      PROPERTIES[p].forEach((name) => {
        const finalClassName = `${name}_${values.reduce((a, c) => `${a}-${c}`)}_${screens.reduce(
          (a, c) => `${a}-${c}`
        )}`.replaceAll('.', '_');

        const finalCSSValues: string[] = [];
        if (res.length === 2) {
          // 单独使用 clamp 处理
          const k =
            (Number(values[1]) - Number(values[0])) / (Number(screens[1]) - Number(screens[0]));

          const calcPixel = Number(values[0]) - k * Number(screens[0]);

          finalCSSValues.push(`
            .${finalClassName} {
              ${name}: clamp(${values[0]}px, ${k * 100}vw ${
            calcPixel < 0 ? `- ${Math.abs(calcPixel)}` : `+ ${calcPixel}`
          }px, ${values[1]}px);
            }
          `);
        } else {
          res.forEach((__, i) => {
            if (i !== res.length - 1) {
              const k =
                (Number(values[i + 1]) - Number(values[i])) /
                (Number(screens[i + 1]) - Number(screens[i]));

              const calcPixel = Number(values[0]) - k * Number(screens[0]);

              finalCSSValues.push(`
            @media only screen and (min-width: ${screens[i]}px) and (max-width: ${
                screens[i + 1]
              }px)  {
              .${finalClassName} {
                ${name}: calc(${k * 100}vw ${
                calcPixel < 0 ? `- ${Math.abs(calcPixel)}` : `+ ${calcPixel}`
              }px);
              }
            }`);
            }
          });
        }
        rulesExtracted[finalClassName] = finalCSSValues;
      });
    });
  }

  useEffect(() => {
    let styleSheet = [...document.styleSheets].find(({ title }) => title === TITLE);
    if (!styleSheet) {
      const style = document.createElement('style');
      style.title = TITLE;
      document.getElementsByTagName('head')[0].appendChild(style);
      if (!(window as any).createPopup) {
        /* For Safari */
        style.appendChild(document.createTextNode(''));
      }
      styleSheet = document.styleSheets[document.styleSheets.length - 1];
    }

    if (responsives.length) {
      const properties: Set<keyof typeof PROPERTIES> = new Set();
      responsives.forEach((o) => {
        const p = o.split(':')[1].split('-')[0] as keyof typeof PROPERTIES;
        properties.add(p);
      });

      Object.keys(rulesExtracted).forEach((key) => {
        if (styleSheet?.cssRules) {
          const rules = [...styleSheet.cssRules];
          const found = rules.find((o) => o.cssText.includes(key));
          if (!found) {
            rulesExtracted[key].forEach((r) => {
              styleSheet?.insertRule(r, 0);
            });
          }
        }
      });
    }
  }, [className]);

  let classNameRemoved = className;
  classNamesToRemove.forEach((s) => {
    classNameRemoved = classNameRemoved.replaceAll(s, '');
  });

  const finalClassName = `${classNameRemoved} ${
    Object.keys(rulesExtracted).length
      ? Object.keys(rulesExtracted).reduce((a, c) => `${a} ${c}`, ' ')
      : ''
  }`
    .replace(/\s+/g, ' ')
    .trim();

  return <TAG data-original-class={className} className={finalClassName} {...othersProps} />;
};

export default memo(Flow);
