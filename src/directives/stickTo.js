import { setCords } from '@/helpers'
export default {
    inserted(el, { value: target }, { context }) {
        const handle = () => {
            setCords(el, target);
        };
        handle();
        const runEvents = () => {
            window.addEventListener("resize", handle);
            window.addEventListener("scroll", handle);
            return () => {
                window.removeEventListener("resize", handle);
                window.removeEventListener("scroll", handle);
            };
        };
        context.runEvents = runEvents();
    },
    unbind(el, bindings, { context }) {
        context.runEvents();
    },
}