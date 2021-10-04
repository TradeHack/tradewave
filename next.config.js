/* eslint-disable @typescript-eslint/no-var-requires */
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
var webpack = require('webpack');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
  async redirects() {
    return [
      {
        source: '/serviceworker',
        destination: '/serviceworker/redirect.html',
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: true,
  plugins: [new webpack.IgnorePlugin(/^electron$/)]
});
