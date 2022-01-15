import RButton from './components/button'
import HeightTransition from './components/heightTransition'
import { RSelect, ROption } from './components/select'
import { RTab, RTabItem } from './components/tabs'


// directives
import clickOutside from 'vue-click-outside'
import Ripple from './directives/ripple'
import appendToBody from './directives/appendToBody'
import stickTo from './directives/stickTo'

// helpers
import { setOptions } from '@/helpers'

// styles
import './styles/index.scss'
import "boxicons/css/boxicons.min.css";

export default {
  install: (Vue, options = {}) => {

    setOptions(Vue, options)

    Vue.component('RButton', RButton)
    Vue.component('RSelect', RSelect)
    Vue.component('ROption', ROption)
    Vue.component('RTab', RTab)
    Vue.component('RTabItem', RTabItem)
    Vue.component('HeightTransition', HeightTransition)

    // directives
    Vue.directive("ripple", Ripple);
    Vue.directive('ClickOutside', clickOutside)
    Vue.directive('appendToBody', appendToBody)
    Vue.directive('stickTo', stickTo)
  }
}