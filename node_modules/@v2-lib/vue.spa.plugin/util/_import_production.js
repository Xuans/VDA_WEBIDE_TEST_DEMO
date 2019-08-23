const _import = file => () => import( /* webpackChunkName: "[request]"*/ /* webpackMode: "lazy" */ `@/views/${file}`)

export default _import