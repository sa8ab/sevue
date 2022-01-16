import Vue from 'vue'
import NotificationsContainer from './NotificationsContainer'
import Notification from './Notification'

const component = Vue.extend(Notification)
const containerComopnent = Vue.extend(NotificationsContainer)

const defaultProps = {
    placement: 'bottom-right'
}
const notification = (data) => {
    const propsData = {
        ...defaultProps,
        ...data
    }
    const instance = new component({
        propsData
    })
    const appendName = propsData.placement.includes('top') ? 'prepend' : 'appendChild'

    const container = document.querySelector(`.r-notifications-container.${propsData.placement}`)
    if (container) {
        container[appendName](instance.$mount().$el)
    } else {
        const containerInstance = new containerComopnent({
            propsData
        })
        const mountedContainer = containerInstance.$mount().$el
        document.body.appendChild(mountedContainer)
        mountedContainer[appendName](instance.$mount().$el)
    }
}

export default notification