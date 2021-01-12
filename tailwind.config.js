module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      scale: {
        "300": "3",
      },
      minHeight: {
        "72": "18rem",
      },
      container: {
        center: true,
      },
    },
  },
  variants: {},
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          marginInline: "auto",
          paddingInline: theme("spacing.4"),
          maxWidth: theme("screens.lg"),

          // Breakpoints
          "@screen sm": {
            maxWidth: theme("screens.sm"),
          },
          "@screen md": {
            maxWidth: theme("screens.md"),
          },
        },
      });
    },
  ],
};
