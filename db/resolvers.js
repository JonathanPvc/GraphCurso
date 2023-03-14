const Usuario = require('../models/Usuario')
const Producto = require('../models/Productos')
const bcryptjs = require( 'bcryptjs')
const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');
require('dotenv').config({ path: 'variables.env' });




// CREAR TOKEN

const crearToken = (usuario , secreta , expiresIn) =>{

    console.log('usuario', usuario);

    const { id , email, nombre , apellido } = usuario

    return jwt.sign( { id, email, nombre ,apellido }, secreta, { expiresIn} )

}





const resolvers = {
    Query: {


        obtenerUsuario :async ( _, { token }) => {  

            const usuarioId = await jwt.verify( token , process.env.SECRETA )
            return usuarioId

        },

        obtenerProductos: async() =>{

            try{

                const productos = await Producto.find({});

                return productos;

            }catch(error){

                console.log(error)

            }
        },

        obtenerProducto : async (_ , { id }) =>{
            //revisar si el producto existe o no
            const producto = await Producto.findById( id );

            if(!producto){

                throw new Error(' Producto no encontrado')
            }

            return producto;
        }


    },



    Mutation: {

        //Crear usuario
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
           
        const salt = await bcryptjs.genSalt(10)

        input.password = await bcryptjs.hash( password , salt);




            try {
                 // guardarlo en la base de datos
                 const usuario = new Usuario(input)
                 usuario.save(); //guardarlo
                 return usuario;

            }catch(error){
                console.log('error');
            }

        },


        autenticarUsuario: async( _, {input}) =>{
            const {email , password} = input
            //si el usuario existe

            const existeUsuario = await Usuario.findOne({email});

            if(!existeUsuario){
                throw new Error('El ususario no existe');
            }

            //Revisar si el password es correcto

            const passwordCorrecto = await bcryptjs.compare( password , existeUsuario.password )
            if (!passwordCorrecto) {
                throw new Error('El Password es Incorrecto');


            }
            //Crear Token
            return{
                token : crearToken(existeUsuario , process.env.SECRETA, '24h' )
            }

        },

        nuevoProducto : async( _, { input }) => {
            try{
                const producto = new Producto(input);

                //almacenar en la bd
                const resultado = await producto.save();

                return resultado;

            }catch ( error ){
                console.log('error')

            }

        },


        actualizarProducto : async(_, {id , input}) => {
                //revisa si el producto existe 
            let producto = await Producto.findById( id );

            if(!producto){

                throw new Error(' Producto no encontrado')
            }

            //Guardar en la base de datop

            producto = await Producto.findOneAndUpdate({_id : id }, input, {new : true});

            return producto;
        },

        eliminarProducto : async (_, { id } ) => {

            let producto = await Producto.findById( id );

            if(!producto){

                throw new Error(' Producto no encontrado')
            }

            producto = await Producto.findByIdAndDelete( {_id : id})

            return "Producto eliminado"
        },

        nuevoCliente : async (_, { input }) =>{
            const { email } = input
            //verificar si el cliente esta ya registrado
            console.log(input);

            const cliente = await Cliente.findOne( {email} )
            if(cliente){
                throw new Error('Ese Cliente ya esta registrado')
            }
            //asignar el vendedor

            const nuevoCliente = new Cliente(input); 
            nuevoCliente.vendedor =  "640ce1a7ae2eb73e84b07d71"


            //guardarlo en la base de datos


            try{
                const resultado = await nuevoCliente.save();
                return resultado;
    
            }catch(error){

                console.log(error);
            }

       



        }



 
    }

}

module.exports = resolvers;