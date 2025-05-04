// src/types/components.d.ts
import XtxSwiper from "./XtxSwiper.vue"
import XtxGuess from "./XtxSwiper.vue"

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
