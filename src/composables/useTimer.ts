import { reactive } from "vue";

// class Timer {
//   private duration: number;
//   private remainingTime: number;
//   private timeoutId: NodeJS.Timeout | null;

//   constructor(duration: number) {
//     this.duration = duration;
//     this.remainingTime = duration;
//     this.timeoutId = null;
//   }

//   start(callback: () => void) {
//     this.timeoutId = setTimeout(() => {
//       callback();
//       this.timeoutId = null;
//     }, this.remainingTime);
//   }

//   pause() {
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//       this.timeoutId = null;
//       this.remainingTime -= this.duration - Date.now();
//     }
//   }

//   resume(callback: () => void) {
//     if (!this.timeoutId) {
//       this.start(callback);
//     }
//   }

//   getRemainingTime() {
//     return this.remainingTime;
//   }
// }

const useTimer = (callback: () => void, duration: number) => {
  const state = reactive<{
    duration: number
    startDate: number
    timeout: NodeJS.Timeout | undefined
    callback: () => void
  }>({
    duration,
    startDate: 0,
    timeout: undefined,
    callback
  })

  const start = () => {
    state.timeout = undefined;
    state.startDate = Date.now();
    state.timeout = setTimeout(() => {
      state.callback();
    }, state.duration);
  }

  const pause = () => {
    if (state.timeout) {
      clearTimeout(state.timeout);
      state.timeout = undefined;
      state.duration -= Date.now() - state.startDate;
      // console.log(state.remainingTime);
    }
  }

  const destroy = () => {
    clearTimeout(state.timeout)
    state.timeout = undefined
  }

  return { start, pause, destroy }
}

export default useTimer