export const POKEMON_LIST_API = "https://pokeapi.co/api/v2/pokemon";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());
