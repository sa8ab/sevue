import Vue from 'vue'
import Loading from './RLoading'

const component = Vue.extend(Loading)

const defaultProps = {
}

const loading = (data) => {
    const propsData = {
        ...defaultProps,
        ...data
    }

    let target
    if (typeof propsData.target === 'string') {
        target = document.querySelector(propsData.target)
    } else if (propsData.target) {
        target = propsData.target.$el || propsData.target
    } else {
        target = document.body
    }

    const instance = new component({
        propsData
    })

    target.appendChild(instance.$mount().$el)

    return {
        close: instance.close
    }
}

export default loading