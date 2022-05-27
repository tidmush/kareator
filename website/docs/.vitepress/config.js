import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Karaetor',
  description: 'You can sing it, why not config it?',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '^/$|^/guide/' },
      {
        text: 'Release Notes',
        link: 'https://github.com/tidmush/kareator/releases'
      }
    ],

    sidebar: {
      '/guide/': getGuideSidebar()
    }
  }
});


function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'What is Karaetor Project?', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Configuration', link: '/guide/configuration' },
        { text: 'Api', link: '/guide/api' },
        { text: 'Packages', link: '/guide/packages' },
        { text: 'Contribution', link: '/guide/contribution' }
      ]
    }
  ]
}
