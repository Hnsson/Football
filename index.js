const express = require('express')
const path = require('path')
const router = require('./routes/router')

const app = express()
const PORT = process.env.PORT || 80
const http = require('http').createServer(app).listen(PORT, () => {console.log("Server started on port: " + PORT)})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', router)

// How front end and back end will work together:
// 1. The user will be able to pick from the dictionary which league they want
// 2. fetch_all_seasons_from_league(league_id) fetches all possible seasons available
//    from that league which will be selectable for further inspection
// 3. User is prompted with the league table from that season
// 4a. User can select a team from that seasons table and view all their matches
//    played in that season using fetch_season_from_team(league_id, season, team)
// 4b. User can see all matches from that season thanks to the following function:
//     fetch_season_from_league(league_id, season)

// Future development:
// · Display upcoming matches from a league
// · Display odds on matches
// · (optional) machine learning to predict what team will win (percentages)