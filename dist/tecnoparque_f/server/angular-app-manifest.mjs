
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 27917, hash: 'd75a63302799a821a275021ffeefc3bb91270fe0ddbdf9cd7526400fd10fe733', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17220, hash: '6a34cadebc74cdd56e4cd1adf56faa412ff1bc54df56e7d6ac80933f8152f9b7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 245205, hash: 'b7d27e7da7449939a72c817f83183ad5cb425f01bab29f39adde72ff0dff82a6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-E4SXJBJ6.css': {size: 238590, hash: 'aeqf2/xYKog', text: () => import('./assets-chunks/styles-E4SXJBJ6_css.mjs').then(m => m.default)}
  },
};
