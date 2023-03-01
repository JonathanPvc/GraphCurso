const {  gql } = require('apollo-server');
// type Cursos {
//     titulo: String
//     tecnologia: String
// }
// type Curso {
//         titulo: String
// }
// type Tecnologia {
//     tecnologia: String
// }
// input CursoInput {
//     tecnologia: String
// }
// input TituloInput {
//     titulo: String
// }
// type Query {
//     obtenerCursos( input : CursoInput!) : [Curso]
//     obtenerTecnologia( input : TituloInput!) : [Tecnologia]
//     obtenerTodos: [Cursos]
// }

const typeDefs = gql`

type Query {
    obtenerCursos: String 
}
`;

module.exports = typeDefs;