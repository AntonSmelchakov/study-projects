export default {
  plugins: {
    '@csstools/postcss-global-data': { files: ['./src/custom-media.css'] },
    'postcss-custom-media': {},
    'postcss-utopia': {
      minWidth: 360,
      maxWidth: 1440,
    },
  },
};
