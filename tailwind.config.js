module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
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
      width:{
        "screen-90": "90vw",
      },
      minWidth: {
        72: "18rem",
        32: "8rem",
      },
      borderWidth: {
        6: "6px",
        10: "10px",
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
