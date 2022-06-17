require('dotenv').config() // Libreria para seleccionar el token_key desde el archivo .env

const {showMenu,pause,readline,showCities} = require('./helpers/inquirer.js')//selecciona los metodos a utilizar
const Search = require('./models/search.js') // Clase Search para utilizar el metodo findCity()

const menu = async()=>{ //Funcion principal que hace todos los procesos primordiales de la aplicacion

    const search = new Search() // Declaración del objeto
    let opt = 0 // variable que guardará la opción que eliga el usuario de la lista

    do{
        opt = await showMenu() // Mostrará un menú y la opción elegida se guardará en la variable opt

        switch(opt){
            case 1: // Si selecciona la opción 1 significa que quiere buscar una ciudad
                let city = await readline('Ciudad: ') // Pedir nombre de ciudad a buscar
                let places = await search.findCity(city) // Retorna todos los lugares que coincidan
                let cities = [] // Variable que guardará las ciudades con los datos que se utilizarán
                places.data.features.forEach(city =>{ 
                    cities.push(                            // Por cada ciudad del arreglo 'places'
                        {                                   // se guardan los datos:
                            id:city.id,                     // id, lugar, ciudad, longitud, latitud.
                            place:city.place_name_es,       // los datos se guardan como objetos
                            city:city.text_es,
                            lng:city.center[0],
                            lat:city.center[1]
                        })
                })
                console.log()
                let id = await showCities(cities)  // Muestra las opciones disponibles, retorna el id, 
                if(id !== 0){                      // si selecciona cancelar retorna 0
                    const placeSelected = cities.find(city => city.id == id)//Encuentra la ciudad teniendo su id
                    //Mostrar resultados de la ciudad seleccionada
                    console.log('\nInformación de la ciudad\n'.green)
                    console.log(`Ciudad: ${placeSelected.city}`)
                    console.log(`Lat: ${placeSelected.lat}`)
                    console.log(`Log: ${placeSelected.lng}`)
                    const temperatureData = await search.temperature(placeSelected.lng,placeSelected.lat)
                    console.log(`temperatura: ${Math.round(+temperatureData.data.main.temp-273.15).toFixed(2)} Celsius`)
                    console.log(`descripcion: ${temperatureData.data.weather[0].description}`)
                    console.log(`Minima: ${Math.round(+temperatureData.data.main.temp_min-273.15).toFixed(2)} Celsius`)
                    console.log(`Maxima: ${Math.round(+temperatureData.data.main.temp_max-273.15).toFixed(2)} Celsius`)
                }
                break
            case 2: // Si la opción es 2 significa que quiere ver el historial

                break
            case 3: // Si la opción es 3 significa que quiere salir y la ejecución del programa termina
                break
            default:
                break
        }
        if(opt !== 3) await pause()
        
    }while(opt !== 3)

}

menu()