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
	mutation ($name: String!, $base_experience: Number!, $height: Number!, $image_url: String) {
		addPokemon (name: $name, base_experience: $base_experience, height: $height, image_url: $image_url) {
			name,
			height
		}
	}
`;

export { getPokemonsQuery, addPokemonMutation };
