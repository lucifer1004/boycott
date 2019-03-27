import {mount, route} from 'navi'

export default mount({
  '/': route({
    title: 'Neighborhood Map',
    getView: () => import('./home'),
  }),
  '/about': route({
    title: 'About',
    getView: () => import('./about'),
  }),
  '/places': route({
    title: 'Google Map Places',
    getView: () => import('./places'),
  }),
})
