
export async function getPokemonDescription(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await response.json();

    // Buscar el flavor_text en español
    const flavorTextsEnEspanol = data.flavor_text_entries.filter((entry: { language: { name: string } }) => entry.language.name === 'es');
    
    if (flavorTextsEnEspanol.length > 0) {
      const flavorText = flavorTextsEnEspanol[0].flavor_text;
      return flavorText;
    } else {
      return 'No se encontró descripción en español para este Pokémon.';
    }
  } catch (error) {
    return 'Ocurrió un error al obtener los datos del Pokémon.';
  }
}