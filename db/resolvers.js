const Usuario = require('../models/Usuario')

const resolvers = {
    Query: {
        obtenerCursos : () => { "Hola Mundo" }


    },
    Mutation: {
        nuevoUsuario :  async (_, { input }) => {

            const { email , password } = input;
            // console.log(input);
            // return "Creando..."

            //Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({email});
            console.log('existeUsuario')

            if(existeUsuario){
                throw new Error('El ususario ya esta registrado');
            }
            //hasear su password
           

            try {
                 // guardarlo en la base de datos
                 const usuario = new Usuario(input)
                 usuario.save(); //guardarlo
                 return usuario;

            }catch(error){
                console.log('error');
            }

        },

    }

}

module.exports = resolvers;