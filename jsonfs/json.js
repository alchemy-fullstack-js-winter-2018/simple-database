function readJSON(pathToFile, callback){
    //callback(err, data/JSON)
    fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data)=>{
        if(err) {
            return callback(err);
        }
    //JSOn.arse to create a JSON object from data
    const json = JSON.parse(data);
    //invoke callback (null, json)
    //NULL is no error
    return callback(null, json);
    })
}


module.exports = {
    readJSON
}