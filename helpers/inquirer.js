const inquirer = require('inquirer')
require('colors')

const questions = [
    {
        type:'list',
        name:'option',
        choices:[
            {
                value:1,
                name:'1. Crear tarea'
            }
        ]
    }
]