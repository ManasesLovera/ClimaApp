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

const readline = async (message) => {

    console.log()
    const {response} = await inquirer.prompt([
        {
            type:'input',
            name:'response',
            message
        }
    ])

    return response
}

const showCities = async(cities = []) => {

    let count = 1
    const choices = []
    cities.forEach( city => {
        let idx = `${count}.`.green
        choices.push({
            value: city.id,
            name: `${idx} ${city.place}`
        })
        count++
    })

    choices.unshift({
        value: 0,
        name: `${'0.'.green} Cancelar`
    })

    const questions = [{
        type:'list',
        name:'id',
        message:'Seleccione el lugar: ',
        choices
    }]

    const {id} = await inquirer.prompt(questions)

    return id

}

module.exports = {
    showMenu,
    pause,
    readline,
    showCities
}