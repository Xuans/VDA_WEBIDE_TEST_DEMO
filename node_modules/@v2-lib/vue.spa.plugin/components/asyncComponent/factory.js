
import LoadingComponent from './loading.vue'
import ErrorComponent from './error.vue'

export default (path, delay, timeout) => () => ({

        component: import( /* webpackChunkName: "[request]"*/ /* webpackMode: "lazy" */ `@/views/${path}`),
        loading: LoadingComponent,
        error: ErrorComponent,
        // 展示加载时组件的延时时间。默认值是 200 (毫秒)
        delay: delay,
        // 如果提供了超时时间且组件加载也超时了，
        // 则使用加载失败时使用的组件。默认值是：`Infinity`,一般用3000
        timeout: timeout
 
})