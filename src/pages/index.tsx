import {createPage, createSwitch} from 'navi'

export default createSwitch({
  paths: {
    '/': createPage({
      title: 'Neighborhood Map',
      getContent: () => import('./home'),
    }),
    '/about': createPage({
      title: 'About',
      getContent: () => import('./about'),
    }),
    '/places': createPage({
      title: 'Google Map Places',
      getContent: () => import('./places'),
    }),
  },
})
