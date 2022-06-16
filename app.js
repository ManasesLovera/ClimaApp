const {showMenu,pause} = require('./helpers/inquirer.js')

function searchCity(){
    console.log("Buscar ciudad")
}
function showHistory(){
    console.log("Mostrar historial")
}
function sendError(){
    console.log("Numero no valido")
}
const menu = async()=>{

    let opt = 0

    do{
        opt = await showMenu()
        if(opt == 1){
            searchCity()
        }
        else if(opt == 2){
            showHistory()
        }
        else if(opt != 3){
            sendError()
        }
        if(opt !== 3) await pause()
        
    }while(opt !== 3)

}

menu()