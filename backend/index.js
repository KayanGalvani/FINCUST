const express = require('express'); //IMPORTAÇÃO DO EXPRESS

const server = express() 

server.use(express.json());



/*
const cursos = ['FullStack Master', 'Desenvolvimento de Games', 'Viver de Youtube' ];



//CRUD --> CREATE, READ, UPDATE, DELETE

//RETORNA UM CURSO
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);
})

//RETORNAR TODOS OS CURSOS
server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

//CRIAR UM NOVO CURSO (POST)
server.post('/cursos', (req, res) => {
    const { name } = req.body;
    cursos.push(name);
    
    return res.json(cursos)
})

//EDITAR UM CURSO (PUT)
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;


    cursos[ index ] = name;

    return res.json(cursos)
})

//EXCLUIR UM CURSO (DELETE)
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1);

    return res.json ({message: "O Curso foi deletado"})
})


server.listen(3000); //LISTEN == ESCUTAR
*/