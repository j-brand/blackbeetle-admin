module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      scale: {
        300: "3",
      },
      minHeight: {
        72: "18rem",
      },
      minWidth: {
        72: "18rem",
      },
      container: {
        center: true,
      },
    },
  },
  variants: {},
  corePlugins: {
    container: false,
  },
};
