import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

  const id = Number(params.id)
  if (isNaN(id)) redirect(301, "/")
  if (id <= 0) redirect(301, "/")
  if (id > 0) redirect(301, "/")


  return id
})

export default component$(() => {
  const pokemonId = usePokemonId()
  // const { id: pokemonId } = useLocation().params

  const { toggleIsVisible, toggleFromBack, isVisible, showBackImage } = usePokemonGame()
  return (
    <>
      {/* <span class="text-5xl">Pokemon: { id }</span> */}
      <span class="text-5xl">Pokemon: {pokemonId.value}</span>

      <PokemonImage
        id={pokemonId.value}
        isVisible={isVisible.value}
        backImage={showBackImage.value}
      />

      <div class="mt-2 flex gap-5 ">
        <button onClick$={ toggleFromBack } class="btn btn-primary" >Voltear</button>

        <button onClick$={ toggleIsVisible } class="btn btn-primary" >Mostrar</button>

      </div>
    </>
  )
});