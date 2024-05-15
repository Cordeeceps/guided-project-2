import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const character = await collection.findOne({id : +req.params.id})
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const film = await collection.findOne({id : +req.params.id})
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planet = await collection.findOne({id : +req.params.id})
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const film = await collection.findOne({id : +req.params.id})
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

// Everything beyond this point is not currently functioning as intended

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const agg = [
            {
              '$lookup': {
                'from': 'films_characters', 
                'localField': 'id', 
                'foreignField': 'film_id', 
                'as': 'films_characters'
              }
            }, {
              '$lookup': {
                'from': 'characters', 
                'localField': 'films_characters.id', 
                'foreignField': 'character_id', 
                'as': 'charactersInFilm'
              }
            }
          ];

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_characters');
        const cursor = collection.aggregate(agg);
        //const charactersInFilm = await collection.find({film_id : +req.params.id}).toArray();
        res.json(charactersInFilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_planets');
        const planetsInFilm = await collection.find({film_id : +req.params.id}).toArray();
        res.json(planetsInFilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_characters');
        const filmsWithCharacter = await collection.find({character_id : +req.params.id}).toArray();
        res.json(filmsWithCharacter);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_planets');
        const planetsInFilm = await collection.find({planet_id : +req.params.id}).toArray();
        res.json(charactersInFilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});