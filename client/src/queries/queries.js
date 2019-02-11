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

export default getPokemonsQuery;
