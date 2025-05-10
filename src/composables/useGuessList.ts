import { ref } from "vue"
import XtxGuess from '@/components/XtxGuess.vue'
export const useGuestList=()=>{
  const guessRef = ref<InstanceType<typeof XtxGuess>>()
  const onscrolltolower= ()=>{
  guessRef.value?.getMore()
}
  return{
    guessRef,
    onscrolltolower
  }
}
