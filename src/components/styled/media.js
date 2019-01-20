import { css } from 'styled-components';

const mediaQuery = {
  desktop: '@media (min-width: 1024px)',
  tabletOrLandscape:
    '@media (min-width: 769px), screen and (orientation: landscape)',
  nonTouchscreen: '@media (hover: hover)'
};

// Iterate through the sizes and create a media template
export default Object.keys(mediaQuery).reduce((acc, label) => {
  acc[label] = (...args) => css`
    ${mediaQuery[label]} {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
