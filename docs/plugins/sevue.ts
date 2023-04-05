import Sevue from 'sevue'
import 'sevue/dist/style.css'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Sevue, {
        nuxtOptions: {
            isNuxt: true,
            NuxtLink: defineNuxtLink({})
        }
    })
})