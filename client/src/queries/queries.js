import { gql } from 'apollo-boost';

const getPokemonsQuery = gql`
	{
		pokemons {
			id
			name
			base_experience
			height
			image_url
		}
	}
`;

const addPokemonMutation = gql`
	mutation addPokemon($pokemon: PokemonDetailsInput!) {
		addPokemon(input: $pokemon) {
			name,
			height
		}
	}
`;

const changePokemonMutation = gql`
	mutation changePokemon($pokemonid: PokemonIDInput!) {
		changePokemon(input: $pokemonid) {
			name,
			height
		}
	}
`;

const deletePokemonMutation = gql`
	mutation deletePokemon($pokemonid: PokemonIDInput!) {
		deletePokemon(input: $pokemonid) {
			name,
			height
		}
}
`;

const pokemonsChangedSub = gql`
	subscription pokemonsChanged {		
			name,
			height
}
`;

export { getPokemonsQuery, addPokemonMutation, changePokemonMutation, deletePokemonMutation, pokemonsChangedSub };
