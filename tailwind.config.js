module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      screens: {
        "sm-only": { max: "639px" },
      },
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
