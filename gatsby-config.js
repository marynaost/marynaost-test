module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `chapters`,
        path: `${__dirname}/content/chapters/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`uk`, `ru`],
        defaultLanguage: `uk`,
        generateDefaultLanguagePage: '/uk',
        siteUrl: ``,

        i18nextOptions: {
          lng: 'uk',
          load: 'currentOnly',

          interpolation: {
            escapeValue: false,
          },

          keySeparator: false,
          nsSeparator: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          tokenize: 'forward',
        },
        query: `
          {
            allMarkdownRemark {
              nodes {
                frontmatter {
                  chapter
                  language
                  title
                  subhead {
                    subhead_title
                    questions {
                      question_title
                      description
                    }
                  }
                }
                id
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'question_title'],
        store: ['id', 'title', 'question_title'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
            title: node.frontmatter.title,
            question_title: node.frontmatter.subhead.questions,
          })),
      },
    },
  ],
};
