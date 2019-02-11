const graphql = require('graphql');
const Pokemon = require('../models/pokemon');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        base_experience: { type: GraphQLInt },
        height: { type: GraphQLInt },
        image_url: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        pokemon: {
            type: PokemonType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args){
                return Pokemon.find(el => el.name === args.name);
            }
        },
        pokemons: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                return Pokemon.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
