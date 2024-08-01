const mode = "local"     //local, dev, prod

let API_URL = 'http://localhost:8000'

if(mode == "local"){
    API_URL = 'http://localhost:8000'
}
else if(mode == "dev"){
    API_URL = 'http://flickdev.online'
}
else if(mode == "prod"){
    API_URL ='http://flickvfx.online'
}

let SUB_URI = '/api'

export {
    API_URL,
    SUB_URI,
}