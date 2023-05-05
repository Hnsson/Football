const axios = require('axios')

// '49,144,63,62,39,2,61,140,135'

leagues = {
    'league-two': 42,
    'league-one': 41,
    'championship': 40,
    'premier-league': 39,
    'championsleague': 2,
    'ligue-1': 61,
    'la-liga': 140,
    'serie-a': 135
};

async function fetch_all_leagues() {
    const leagueIds = [42,41,40,39,2,61,140,135];

    var request = {
        method: 'GET',
        url: `https://v3.football.api-sports.io/leagues`,
        headers: {
            'x-rapidapi-key': 'f67826415ac5a92eda95726d55e68e5d',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    }

    try {
        const response = await axios(request)
        return response.data.response.filter(obj => leagueIds.includes(obj.league.id));
    } catch(err) {
        console.log(err)
    }

}

async function fetch_all_season_from_league(league_id) {
    var request = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/leagues',
        headers: {
          'x-rapidapi-key': 'f67826415ac5a92eda95726d55e68e5d',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        },
        params: {
          type: "league",
          country: "England"
        }
      }

    try {
        const response = await axios(request)
        return response.data.response.find(obj => obj.league.id === league_id);
    } catch (err) {
        console.log(err);
    }
}

async function fetch_season_from_league(league_id, season) {
    var request = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        headers: {
            'x-rapidapi-key': 'f67826415ac5a92eda95726d55e68e5d',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        },
        params: {
            league: league_id,
            season: season
        }
    }

    try {
        const response = await axios(request)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

async function fetch_table_from_league(league_id, season) {
    var request = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/standings',
        headers: {
            'x-rapidapi-key': 'f67826415ac5a92eda95726d55e68e5d',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        },
        params: {
            league: league_id,
            season: season
        }
    }

    try {
        const response = await axios(request)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

async function fetch_season_from_team(league_id, season, team) {
    var request = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        headers: {
            'x-rapidapi-key': 'f67826415ac5a92eda95726d55e68e5d',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        },
        params: {
            league: league_id,
            season: season,
            team: team
        }
    }

    try {
        const response = await axios(request)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    fetch_all_leagues,
    fetch_all_season_from_league,
    fetch_season_from_league,
    fetch_table_from_league,
    fetch_season_from_team
  };

// fetch_season_from_team(39, 2010, 40).then((res) => {
//     console.log(res)
// })


// How front end and back end will work together:
// 1. The user will be able to pick from the dictionary which league they want
// 2. fetch_all_seasons_from_league(league_id) fetches all possible seasons available
//    from that league which will be selectable for further inspection
// 3. User is prompted with the league table from that season
// 4a. User can select a team from that seasons table and view all their matches
//    played in that season using fetch_season_from_team(league_id, season, team)
// 4b. User can see all matches from that season thanks to the following function:
//     fetch_season_from_league(league_id, season)
