const axios = require('axios')

class Search {

    historial = []

    constructor(){
        // todo: leer base de datos si existe
    }

    get paramsMapBox(){
        return {
            'access_token':process.env.MAPBOX,
            'language':'es',
            'proximity':'ip',
            'limit':7
        }
    }

    async findCity( city = '' ){
        
        //peticion http
        const cityData = axios.create({
            baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
            params: this.paramsMapBox
        })

        const response = await cityData.get()

        return response // retorna los lugares que coincidan
    }

    async temperature(lon,lat){
        const weather = axios.create({
            baseURL:'https://api.openweathermap.org/data/2.5/weather',
            params:{
                lon,
                lat,
                appid:process.env.openweather_key
            }
        })
        try{
            return await weather.get()
        }catch(e){
            return 'http error'
        }
    }
}

module.exports = Search