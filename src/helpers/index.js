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
    const colors = options.theme && options.theme.colors || {}

    const colorKeys = Object.keys(colors)
    colorKeys.forEach((key) => {
        colors[key]
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty(`--rgb-${key}`, colors[key]);
        }
    })
}