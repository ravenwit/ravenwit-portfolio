import { css } from 'styled-components';

const variables = css`
  :root {
    --nav-background: rgba(3,3,36, 0.85);
    --dark-navy: #00001E;
    --navy: #030324;
    --light-navy: #030339;
    --lightest-navy: #1C1C48;
    --navy-shadow: #030317;
    --dark-slate: #495670;
    --slate: #95B2D8;
    --light-slate: #ABBFD8;
    --lightest-slate: #B8C6D7;
    --white: #F8F9F8;
    --highlight: #5BECC0;
    --highlight-tint: rgba(91, 236, 192, 0.1);
    --highlight-second: #EDC239;
    --pink: #f57dff;
    --blue: #57cbff;
    --yellow-orange: #FFB24A;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
