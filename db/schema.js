const { gql } = require('apollo-server');

//Schema
const typeDefs = gql`

type Usuario {
    id : ID
    nombre : String
    apellido : String
    email:String
    creado : String
}

type Token {
    token : String
}

type Producto{
    id : ID
    nombre : String
    existencia : Int
    precio : Float
    creado : String
}

type Cliente {
    id: ID
    nombre : String
    apellido : String
    empresa : String
    email : String
    telefono : String
    vendedor : ID
}

input UsuarioInput{
    nombre : String!
    apellido : String!
    email : String!
    password : String!
}

input AutenticarInput {
    email : String!
    password : String!
}

input ProductoInput{
    nombre : String!
    existencia : Int!
    precio : Float!
}

input ClienteInput{
    nombre : String!
    apellido : String!
    empresa: String!
    email: String!
    telefono: String
}

type Query {

    # USUARIOS
    obtenerUsuario(token : String!) : Usuario 

    # Productos
    obtenerProductos : [Producto]
    obtenerProducto(id : ID!) : Producto
}

type Mutation{

    # USUARIOS
    nuevoUsuario(input : UsuarioInput ) : Usuario
    autenticarUsuario (input : AutenticarInput) : Token 

    # PRODUCTOS
    nuevoProducto(input : ProductoInput) : Producto
    actualizarProducto( id : ID! , input : ProductoInput ) : Producto
    eliminarProducto(id : ID!) : String

    #Clientes

    nuevoCliente( input : ClienteInput ) : Cliente
}
`;



module.exports = typeDefs;