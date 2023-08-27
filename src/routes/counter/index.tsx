import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks';

export default component$(() => {
  const { counter, decreaseCounter, increaseCounter } = useCounter(15)
  

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-7xl">{ counter }</span>

      <div class="mt-2">
        <button onClick$={decreaseCounter} class="btn btn-primary mr-2">-1</button>
        <button onClick$={increaseCounter} class="btn btn-primary">+1</button>
      </div>
    </>
  )
});