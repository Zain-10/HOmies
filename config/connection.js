const { MongoClient } = require('mongodb')
const state={
    db:null
}

module.exports.connect=function(){
    const url = 'mongodb://localhost:27017'
    const dbname = 'homies'

    const client = new MongoClient(url, {monitorCommands: true})

    //client.on('commandStarted', started => console.log(started));
    state.db=client.db(dbname)
}

module.exports.get=function(){
    return state.db
}