const inquirer = require('inquirer')
require('colors')

const questions = [
    {
        type:'list',
        name:'option',
        message:'Que desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1.'.yellow} Buscar ciudad`
            },
            {
                value:2,
                name:`${'2.'.yellow} Historial`
            },
            {
                value:3, 
                name:`${'3.'.yellow} Salir`
            }
        ]
    }
]

const showMenu = async () => {
    console.clear()
    
    console.log('========================='.green)
    console.log('  Seleccione una opcion'.white)
    console.log('=========================\n'.green)

    const {option} = await inquirer.prompt(questions)

    return option
}

const pause = async() => {

    console.log('\n')
    await inquirer.prompt([
        {
            type:'input',
            name:'nothing',
            message:`Presiona ${'enter'.green} para continuar`
        }
    ])
}



module.exports = {
    showMenu,
    pause
}