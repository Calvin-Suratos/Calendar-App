const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('Server is running. Good work');
})

app.get('/authors', (request, response) => {
    knex('app_authors')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
            response.status(200).send(responseData)
        })

})

app.get('/users', (req, res) => {
    knex('users')
    .select('*')
    .then(usersData => res.status(200).json(usersData))
    .catch(() => res.status(400).send('Could not retrieve data.'))
})

app.get('/events', (req, res) => {
    knex('events')
    .select('*')
    .then(eventsData => res.status(200).json(eventsData))
    .catch(() => res.status(400).send('Could not retrieve data.'))
})

app.get('/userevents/:id', (req, res) => {
    knex('events')
    .join('users', 'users.id', '=', 'events.users_id')
    .select(
        'events.id as id',
        'users.name as name',
        'users.color as color',
        'events.name as eventname',
        'events.start_date as start',
        'events.end_date as end',
        'description'
    )
    .where({'users.id' : req.params.id})
    .then(data => res.status(200).json(data))
    .catch(() => res.status(400).send('Could not retrieve data'))
})


app.get('/userevents', (req, res) => {
    knex('events')
    .join('users', 'users.id', '=', 'events.users_id')
    .select(
        'events.id as id',
        'users.name as name',
        'users.color as color',
        'events.name as eventname',
        'events.start_date as start',
        'events.end_date as end',
        'description'
    )
    .then(data => res.status(200).json(data))
    .catch(() => res.status(400).send('Could not retrieve data'))
})


app.post('/newuserevents', (req, res) => {
    knex('events')
    .insert(req.body)
    .then(data => res.status(200).send(data))
    .catch(() => res.status(400).send('Could not retrieve data'))
})

app.patch('/patchuserevents/:id', (req, res) => {
    knex('events')
    .update(req.body)
    .where({id: req.params.id})
    .then(data => res.status(200).send(data))
    .catch(() => res.status(404).send('Could not update event'))
})

app.delete('/deleteuserevents/:id', (req, res) => {
    knex('events')
    .delete()
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(() => res.status(404).send('Could not update event'))
})

module.exports = app;