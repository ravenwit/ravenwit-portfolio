module.exports = {
  email: 's.ahmed7733@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/ravenwit',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/raven.shakir',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/shakir7733',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/shakir-ahmed-raven',
    },
    {
      name: 'Researchgate',
      url: 'https://www.researchgate.net/profile/Shakir-Ahmed-5',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Know-How',
      url: '/#skills',
    },
    {
      name: 'Academia',
      url: '/#education',
    },
    {
      name: 'Hustles',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Connect',
      url: '/#contact',
    },
  ],

  colors: {
    highlight: '#5BECC0',
    navy: '#030324',
    darkNavy: '#00001E',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
