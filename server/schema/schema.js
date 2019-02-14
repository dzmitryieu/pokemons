const graphql = require('graphql');
const Pokemon = require('../models/pokemon');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLInputObjectType,
	GraphQLNonNull
} = graphql;

const PokemonType = new GraphQLObjectType({
	name: 'Pokemon',
	fields: ( ) => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		base_experience: { type: GraphQLString },
		height: { type: GraphQLString },
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
		base_experience: { type: new GraphQLNonNull(GraphQLString) },
		height: { type: new GraphQLNonNull(GraphQLString) }, 
		image_url: { type: GraphQLString }
	})
	});
	
const PokemonIDInput = new GraphQLInputObjectType({
	name: 'PokemonIDInput',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLString },
		base_experience: { type: GraphQLString },
		height: { type: GraphQLString }, 
		image_url: { type: GraphQLString }
	})
  });
  
const PokemonDetailsPayload = new GraphQLObjectType({
	name: 'PokemonDetailsPayload',  
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
		base_experience: { type: new GraphQLNonNull(GraphQLString) },
		height: { type: new GraphQLNonNull(GraphQLString) }, 
		image_url: { type: GraphQLString }
	})
});

const PokemonIDPayload = new GraphQLObjectType({
	name: 'PokemonIDPayload',  
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		name: { type: GraphQLString },
		base_experience: { type: GraphQLString },
		height: { type: GraphQLString }, 
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
		changePokemon: {
			name: 'ChangePokemon',
			description: "Schema change pokemon mutation",
			type: PokemonIDPayload,
			args: {
				input: { type: new GraphQLNonNull(PokemonIDInput) },
			},
			resolve(parent, args){
				Pokemon.findById(args.input.id, (err, doc) => {
					if(err) return res.send(500, { error: err });
					for (let key in doc) {
						doc[key] = args.input[key] || doc[key];
					};
					return doc.save();
				});			
			}
		},
		deletePokemon: {
			name: 'DeletePokemon',
			description: "Schema delete pokemon mutation",
			type: PokemonIDPayload,
			args: {
				input: { type: new GraphQLNonNull(PokemonIDInput) },
			},
			resolve(parent, args){
				Pokemon.findById(args.input.id, (err, doc) => {
					if(err) return res.send(500, { error: err });
					return doc.remove();
				});			
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: MutationQuery,
});
