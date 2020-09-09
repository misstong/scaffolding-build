const axios = require('axios')



axios.interceptors.request.use(function(config){
    console.log('gotcha')
    // do something to request
    return config
}, function(error){

})

axios.interceptors.response.use(function(config){
    console.log('gotcha')
    // do something to request
    return config
}, function(error){

})


axios.get('https://www.npmjs.com/package/axios').then(res=>{
    // console.log(res.data)
    console.log('res get')
})