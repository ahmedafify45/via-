// next.config.js

const config = {
  output: "export",
  // i18n config is not supported with static exports
  // We'll handle internationalization through our own routing
  images: {
    unoptimized: true,
  },
};

export default config;
