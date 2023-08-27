import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getPokemonDescription } from '~/helpers/get-chat-gpt-response';

// import { getPokemonDescription } from '~/helpers/get-chat-gpt-response'

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {

  const offset = Number(query.get("offset") ?? 0)

  if(isNaN(offset)) redirect(301, pathname)
  if(offset < 0) redirect(301, pathname)

  return await getSmallPokemons(offset)
})

export default component$(() => {

  const pokemons = usePokemonList();  
  const location = useLocation()

  const modalVisible = useSignal(false)
  const modalPokemon = useStore({
    id: "",
    name: ""
  })

  const pokemonFact = useSignal('');
  

  // Modal functions

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true
  })

  const closeModal = $(() => {

    modalVisible.value = false
  })

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get("offset")
    const offsetString = new URLSearchParams(location.url.search)
    return Number(offsetString.get("offset") || 0)
  })

  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name)

    pokemonFact.value=''

    if(+modalPokemon.id > 0) {
      getPokemonDescription(+modalPokemon.id)
        .then((res) => pokemonFact.value = res)

    }

  })


  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: { currentOffset }</span>
        <span>Esta cargando pagina: { location.isNavigating ? "Si" : "No" }</span>
      </div>

      <div class="mt-10">
        <Link 
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>


        <Link 
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>

      </div>
      
      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map((pokemon) => (
            <div key={pokemon.name}
            onClick$={() => showModal(pokemon.id, pokemon.name)}
              // onClick$={() => modalVisible.value = true}
              class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize">{pokemon.name}</span>
              <PokemonImage id={pokemon.id} isVisible />
            </div>
          ))
        }
      </div>
      
        <Modal showModal={ modalVisible.value } closeFn={closeModal}>
        <div q:slot='title'>{modalPokemon.name } </div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id} isVisible/>

          <span>
            {
              pokemonFact.value === ''
              ? `Consultando información de ${modalPokemon.name}` 
              : pokemonFact
            }
          </span>
        </div>
        </Modal>

    </>
  )
});

export const head: DocumentHead = {
  title: 'List - SSR'
};