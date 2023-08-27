import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks';

export default component$(() => {

  const nav = useNavigate()

  const { pokemonId, isVisible, nextPokemon, previousPokemon, showBackImage, toggleFromBack, toggleIsVisible } = usePokemonGame()

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`)
  })

  return (
    <>
      <span class="text-2xl" >Buscador simple</span>

      <span class="text-9xl">{ pokemonId.value }</span>
        <div
          onClick$={goToPokemon}
        >
          <PokemonImage 
            id={pokemonId.value} 
            size={200} 
            backImage={showBackImage.value} 
            isVisible={isVisible.value}
          />
        </div>

      <div class="mt-2 flex gap-5 ">
        <button onClick$={ previousPokemon } class="btn btn-primary" >Anterior</button>

        <button onClick$={ nextPokemon }  class="btn btn-primary" >Siguiente</button>

        <button onClick$={ toggleFromBack }  class="btn btn-primary" >Voltear</button>

        <button onClick$={ toggleIsVisible }  class="btn btn-primary" >Revelar</button>

      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Primera aplicación en Qwik',
    },
  ],
};
