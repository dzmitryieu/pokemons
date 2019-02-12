const graphql = require('graphql');
const Pokemon = require('../models/pokemon');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLInputObjectType,
	GraphQLNonNull
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

const PokemonDetailsInput = new GraphQLInputObjectType({
	name: 'PokemonDetailsInput',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
		base_experience: { type: new GraphQLNonNull(GraphQLInt) },
		height: { type: new GraphQLNonNull(GraphQLInt) }, 
		image_url: { type: GraphQLString }
	})
  });
  
  const PokemonDetailsPayload = new GraphQLObjectType({
    name: 'PokemonDetailsPayload',  
    fields: () => ({
			name: { type: new GraphQLNonNull(GraphQLString) },
			base_experience: { type: new GraphQLNonNull(GraphQLInt) },
			height: { type: new GraphQLNonNull(GraphQLInt) }, 
			image_url: { type: GraphQLString }
    })
  });


const MutationQuery = new GraphQLObjectType({
	name: 'MutationQueryType',
	fields: {
		addPokemon: {
			name: 'AddPokemon',
			description: "Schema add pokemon mutation",
			type: PokemonDetailsPayload,
			args: {
				input: { type: new GraphQLNonNull(PokemonDetailsInput) },
			},
			resolve(parent, args){
				let pokemon = new Pokemon({
					name: args.input.name,
					base_experience: args.input.base_experience,
					height: args.input.height,
					image_url: args.input.image_url
				});
				return pokemon.save();
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: MutationQuery,
});
