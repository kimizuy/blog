/* eslint-disable func-names */
const { createLoader } = require('simple-functional-loader')
const rehypePrism = require('@mapbox/rehype-prism')

module.exports = {
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
        options: {
          rehypePlugins: [rehypePrism],
        },
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /preview/,
          use: [
            ...mdx,
            createLoader(function (src) {
              if (src.includes('<!--more-->')) {
                const [preview] = src.split('<!--more-->')
                return this.callback(null, preview)
              }

              const [preview] = src.split('<!--/excerpt-->')
              return this.callback(null, preview.replace('<!--excerpt-->', ''))
            }),
          ],
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import Post from "@/components/post"',
                'export { getStaticProps } from "@/lib/getStaticProps"',
                src,
                'export default (props) => <Post meta={meta} {...props} />',
              ].join('\n')

              if (content.includes('<!--more-->')) {
                return this.callback(
                  null,
                  content.split('<!--more-->').join('\n')
                )
              }

              return this.callback(
                null,
                content.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, '')
              )
            }),
          ],
        },
      ],
    })

    // if (!options.dev && options.isServer) {
    //   const originalEntry = config.entry

    //   config.entry = async () => {
    //     const entries = { ...(await originalEntry()) }
    //     entries['./scripts/build-rss.js'] = './scripts/build-rss.js'
    //     return entries
    //   }
    // }

    return config
  },
}
