module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        //console.log(req)
        res.status(500).send('Hello')
    })
}