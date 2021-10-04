/* eslint-disable @typescript-eslint/no-var-requires */
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
});
