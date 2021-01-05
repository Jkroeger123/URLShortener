const express = require('express');
const mongo = require('mongodb');
const monk = require('monk');
const yup = require('yup');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

let db = monk(process.env.MONGO_URI);

const urls = db.get('urls');
urls.createIndex('name');

const schema = yup.object().shape({
    id: yup.string().trim().required(),
    url: yup.string().trim().url().required()
});

app.use(express.static('./static'));
app.use(express.json());
app.use((error, req, res, next) => {
});

app.post('/shorten', async (req, res) => {
    let {id, url} = req.body;

    try{
        await schema.validate({
            id, url
        });

        const exists = await urls.findOne({id});
        if(exists){
            res.status(500);
            res.json({error: "ID is in use"});
        }else{

            const newUrl = {
                id, url
            };
    
            const created = await urls.insert(newUrl);
    
            res.status(200);
            res.json(created);
        }

    }catch (error){
        res.json({
            message: error.message,
            stack: error.stack
        });
    }

});

app.get('/:id', async (req, res) =>{
    let id = req.params.id;

    try{
        const entry = await urls.findOne({id});

        if(entry){
            res.redirect(entry.url);
        }else{
            res.redirect('/');
        }

    }catch{

    }
});

app.get('/', (req, res) => {
    res.sendFile('./static/index.html');
});

app.listen(PORT, () =>{
    console.log(`Server Listening on port ${PORT}`);
});