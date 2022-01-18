export function setCords(element, parent) {
    const cords = parent.getBoundingClientRect();
    const x = cords.x;
    const y = cords.y;
    const w = parent.clientWidth;
    const h = cords.height;
    const style = element.style;
    const scrollTop = window.pageYOffset;
    const elTop = element.clientHeight + cords.y + scrollTop;
    const rootTop = scrollTop + window.innerHeight;

    if (rootTop - elTop < 30) {
        // console.log('hola mundo')
        style.top = `${y + scrollTop - element.clientHeight - 2}px`;
        style.left = `${x}px`;
        style.width = `${parent.clientWidth}px`;
        element.classList.add("top");
        parent.classList.add("top");
    } else {
        style.top = `${y + scrollTop + h - 2}px`;
        style.left = `${x}px`;
        style.width = `${parent.clientWidth}px`;
        element.classList.remove("top");
        parent.classList.remove("top");
    }
}

export const setOptions = (vue, options) => {
    const colors = options.colors || {}
    const dark = options.dark
    setDark(dark)
    const colorKeys = Object.keys(colors)
    colorKeys.forEach((key) => {
        const color = getColor(colors[key])
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty(`--rgb-${key}`, color);
        }
    })
}

export const setDark = (dark) => {
    if (typeof document === 'undefined') return
    if (dark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

export const getColor = (color) => {
    const presetColors = ['red', 'yellow', 'prm', 'green']
    const isRGB = /^(rgb|rgba)/.test(color)
    const isHEX = color.startsWith('#')
    const isPreset = presetColors.includes(color)
    if (isRGB) {
        const [r, g, b] = color.replace(/[rgba()]/g, '').split(',')
        return `${r}, ${g}, ${b}`
    } else if (isHEX) {
        const [r, g, b] = hexToRgb(color)
        return `${r}, ${g}, ${b}`
    } else if (isPreset) {
        if (typeof window === 'undefined') return ''
        const style = window.getComputedStyle(document.body)
        return style.getPropertyValue('--rgb-' + color)
    }
}