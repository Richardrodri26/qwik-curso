import { useSignal, $, useComputed$ } from "@builder.io/qwik";



export const useCounter = (initialValue: number) => {

  const counter = useSignal(initialValue);

  const increaseCounter = $(() => {
    counter.value++
  })
  const decreaseCounter = $(() => {
    counter.value--
  })

  return {
    increaseCounter,
    decreaseCounter,
    counter: useComputed$(() => counter.value),
  }
}