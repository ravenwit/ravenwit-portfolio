const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="mobile-fallback-revert"
      dangerouslySetInnerHTML={{
        __html: `
          function checkMobileFallbackRevert() {
            if (window.innerWidth > 768) {
              window.location.replace('/');
            }
          }
          checkMobileFallbackRevert();
          window.addEventListener('resize', checkMobileFallbackRevert);
        `,
      }}
    />,
  ]);
};
