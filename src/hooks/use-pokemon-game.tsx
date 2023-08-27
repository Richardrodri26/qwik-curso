import { useContext, $, useComputed$ } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";


export const usePokemonGame = () => {

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if( (pokemonGame.pokemonId + value) <= 0 ) return

    pokemonGame.pokemonId += value
  })

  const toogleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage
  })
  const toogleIsVisible = $(() => {
    pokemonGame.isVisible = !pokemonGame.isVisible
  })

  

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isVisible: useComputed$(() => pokemonGame.isVisible),
    nextPokemon: $(() => changePokemonId(+1)),
    previousPokemon: $(() => changePokemonId(-1)),

    toggleFromBack: toogleFromBack,
    toggleIsVisible: toogleIsVisible

  }
}