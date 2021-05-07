const { createLoader } = require('simple-functional-loader')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    domains: ['pbs.twimg.com'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /rss/,
          use: mdx,
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import { Post } from "components/post"',
                'export { getStaticPropsPost } from "lib/getStaticPropsPost"',
                src,
                'export default (props) => <Post meta={meta} {...props} />',
              ].join('\n')

              return this.callback(null, content)
            }),
          ],
        },
      ],
    })

    if (options.isServer) {
      const originalEntry = config.entry

      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries['./scripts/build-rss.js'] = './scripts/build-rss.tsx'

        return entries
      }
    }

    // Replace React with Preact only in client production build
    if (!options.dev & !options.isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },

  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/_next/static/feed.xml',
      },
    ]
  },

  // future: {
  //   webpack5: true,
  // },
}

module.exports = withBundleAnalyzer(nextConfig)
