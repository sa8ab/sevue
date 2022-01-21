import RButton from './components/button'
import RCheckbox from './components/checkbox'
import RPopup from './components/popup'
import RInput from './components/input'
import HeightTransition from './components/heightTransition'
import { RSelect, ROption, RSelectGroup } from './components/select'
import { RTab, RTabItem } from './components/tabs'


// directives
import clickOutside from 'vue-click-outside'
import Ripple from './directives/ripple'
import appendToBody from './directives/appendToBody'
import stickTo from './directives/stickTo'

// helpers
import { setOptions, getColor, setDark } from '@/helpers'

// functions
import notification from './components/notification/function'

// styles
import './styles/index.scss'

const defaultOptions = {
  ripple: true,
  iconPrefix: 'bx',
  colors: {},
  dark: false
}
export default {
  install: (Vue, userOptions) => {
    const options = { ...defaultOptions, ...userOptions }

    setOptions(Vue, options)

    Vue.component('RButton', RButton)
    Vue.component('RSelect', RSelect)
    Vue.component('ROption', ROption)
    Vue.component('RSelectGroup', RSelectGroup)
    Vue.component('RTab', RTab)
    Vue.component('RTabItem', RTabItem)
    Vue.component('HeightTransition', HeightTransition)
    Vue.component('RCheckbox', RCheckbox)
    Vue.component('RPopup', RPopup)
    Vue.component('RInput', RInput)

    // directives
    const hasRipple = options.ripple
    Vue.directive("ripple", hasRipple ? Ripple : {});
    Vue.directive('ClickOutside', clickOutside)
    Vue.directive('appendToBody', appendToBody)
    Vue.directive('stickTo', stickTo)

    // rootFunctions
    Vue.prototype.$r = {}
    Vue.prototype.$r.iconPrefix = options.iconPrefix
    Vue.prototype.$r.getColor = getColor
    Vue.prototype.$r.notification = notification
    Vue.prototype.$r.setDark = setDark

  }
}