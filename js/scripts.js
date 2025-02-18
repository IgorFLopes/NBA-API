const buttonBtn = document.querySelector("#btn");
const playersList = document.querySelector("#list-jogadores");
const teamInfo = document.querySelector("#list-prin")
const buttonBtn2 = document.querySelector("#btn2");
const teamListContainer = document.querySelector("#team-list");
const listJogadoresContainer = document.querySelector("#list-jogadores");



// Cria um contêiner para os detalhes do jogador
const playerDetailsContainer = document.createElement("div");
playerDetailsContainer.classList.add("player-details-container");
playersList.after(playerDetailsContainer); // Insere abaixo da lista


const getData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                "Authorization": `72858899-bc59-4249-85c0-6053aadcd488`
            }
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const handleTeamDataContainer = () => {
    const teamDataContainer = document.querySelector("#team-data")

    if (!teamDataContainer) {
        const teamDataDiv = document.createElement("div")
        teamDataDiv.id = "team-data"
        teamListContainer.appendChild(teamDataDiv)

        return;
    }
    teamDataContainer.innerHTML = ""
}

const handlePlayerDataContainer = () => {
    const teamDataContainer = document.querySelector("#player-data")

    if (!teamDataContainer) {
        const teamDataDiv = document.createElement("div")
        teamDataDiv.id = "player-data"
        listJogadoresContainer.appendChild(teamDataDiv)

        return;
    }
    teamDataContainer.innerHTML = ""
}

buttonBtn.addEventListener("click", async () => {
    handlePlayerDataContainer()
    // playersList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
    const listaDeJogadores = await getData("https://api.balldontlie.io/v1/players");
    
    listaDeJogadores.forEach(player => {
        const teamDataContainer = document.querySelector("#player-data")
        const resultListPlayers = document.createElement("div");
        resultListPlayers.classList.add("player-item");
        resultListPlayers.innerText = player.first_name;

        // Adiciona um evento de clique para mostrar mais informações
        resultListPlayers.addEventListener("click", async() => {
            const playerMoreData = await getData(`https://api.balldontlie.io/v1/players/${player.id}`)
 
            showPlayerDetails(playerMoreData);
        });

        teamDataContainer.appendChild(resultListPlayers);
    });

});

function showPlayerDetails(player) {
    let playerDetailsContainer = document.querySelector("#player-details-container");
    if (!playerDetailsContainer) {
        playerDetailsContainer = document.createElement("div");
        playerDetailsContainer.id = "player-details-container";
        document.body.appendChild(playerDetailsContainer);
    }

    
    playerDetailsContainer.innerHTML = `
        <div class="player-details">
            <strong>Nome:</strong> ${player.first_name} ${player.last_name} <br>
            <strong>Posição:</strong> ${player.position || "Desconhecida"} <br>
            <strong>Time:</strong> ${player.team ? player.team.full_name : "Sem time"} <br>
            <strong>Altura:</strong> ${player.height ? player.height : "Não disponível"} ft <br>
            <strong>Peso:</strong> ${(player.weight * 0.453592).toFixed(2)} kg
        </div>
    `;
}


// PARTE 2


// Função para obter e exibir informações dos times
buttonBtn2.addEventListener("click", async () => {
    handleTeamDataContainer()

    const teamsList = await getData("https://api.balldontlie.io/v1/teams");

    teamsList.forEach(team => {
        const teamDataContainer = document.querySelector("#team-data")

        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team-item");
        teamDiv.innerText = team.full_name;

        // Adiciona um evento de clique para mostrar mais informações do time
        teamDiv.addEventListener("click", async () => {
            const teamMoreData = await getData(`https://api.balldontlie.io/v1/teams/${team.id}`);
            showTeamDetails(teamMoreData);
        });

        teamDataContainer.appendChild(teamDiv);
    });
});

function showTeamDetails(team) {
    let teamDetailsContainer = document.querySelector("#team-details-container");
    if (!teamDetailsContainer) {
        teamDetailsContainer = document.createElement("div");
        teamDetailsContainer.id = "team-details-container";
        document.body.appendChild(teamDetailsContainer);
    }

    teamDetailsContainer.innerHTML = `
        <div class="team-details">
            <strong>Nome:</strong> ${team.full_name} <br>
            <strong>Abreviação:</strong> ${team.abbreviation} <br>
            <strong>Cidade:</strong> ${team.city} <br>
            <strong>Conferência:</strong> ${team.conference} <br>
            <strong>Divisão:</strong> ${team.division}
        </div>
    `;
}

// Seleciona todos os logos de times
// const teamLogos = document.querySelectorAll(".image-container img");

// // Função para buscar informações do time através de Objeto.
// function getTeamInfo(teamId) {
//     const teamsInfo = {
//         "team-atlanta": {
//             name: "Atlanta Hawks",
//             founded: "1946",
//             location: "Atlanta, Georgia",
//             championships: 1,
//         },
//         "team-boston": {
//             name: "Boston Celtics",
//             founded: "1946",
//             location: "Boston, Massachusetts",
//             championships: 18,
//         },
//         "team-charlotte": {
//             name: "Charlotte Hornets",
//             founded: "1988",
//             location: "Charlotte, North Carolina",
//             championships: 0,
//         },
//         "team-chicago": {
//             name: "Chicago Bulls",
//             founded: "1966",
//             location: "Chicago, Illinois",
//             championships: 6,
//         },
//         "team-cavs": {
//             name: "Cleveland Cavaliers",
//             founded: "1970",
//             location: "Cleveland, Ohio",
//             championships: 1,
//         },
//         "team-mavericks": {
//             name: "Dallas Mavericks",
//             founded: "1980",
//             location: "Dallas, Texas",
//             championships: 1,
//         },
//         "team-nuggets": {
//             name: "Denver Nuggets",
//             founded: "1967",
//             location: "Denver, Colorado",
//             championships: 1,
//         },
//         "team-pistons": {
//             name: "Detroit Pistons",
//             founded: "1941",
//             location: "Detroit, Michigan",
//             championships: 3,
//         },
//         "team-warriors": {
//             name: "Golden State Warriors",
//             founded: "1946",
//             location: "San Francisco, California",
//             championships: 6,
//         },
//         "team-rockets": {
//             name: "Houston Rockets",
//             founded: "1967",
//             location: "Houston, Texas",
//             championships: 2,
//         },
//         "team-pacers": {
//             name: "Indiana Pacers",
//             founded: "1967",
//             location: "Indianapolis, Indiana",
//             championships: 0,
//         },
//         "team-clippers": {
//             name: "Los Angeles Clippers",
//             founded: "1970",
//             location: "Los Angeles, California",
//             championships: 0,
//         },
//         "team-lakers": {
//             name: "Los Angeles Lakers",
//             founded: "1947",
//             location: "Los Angeles, California",
//             championships: 17,
//         },
//         "team-grizzlies": {
//             name: "Memphis Grizzlies",
//             founded: "1995",
//             location: "Memphis, Tennessee",
//             championships: 0,
//         },
//         "team-heat": {
//             name: "Miami Heat",
//             founded: "1988",
//             location: "Miami, Florida",
//             championships: 3,
//         },
//         "team-bucks": {
//             name: "Milwaukee Bucks",
//             founded: "1968",
//             location: "Milwaukee, Wisconsin",
//             championships: 2,
//         },
//         "team-timberwolves": {
//             name: "Minnesota Timberwolves",
//             founded: "1989",
//             location: "Minneapolis, Minnesota",
//             championships: 0,
//         },
//         "team-pelicans": {
//             name: "New Orleans Pelicans",
//             founded: "2002",
//             location: "New Orleans, Louisiana",
//             championships: 0,
//         },
//         "team-knicks": {
//             name: "New York Knicks",
//             founded: "1946",
//             location: "New York City, New York",
//             championships: 2,
//         },
//         "team-thunder": {
//             name: "Oklahoma City Thunder",
//             founded: "1967",
//             location: "Oklahoma City, Oklahoma",
//             championships: 1,
//         },
//         "team-magic": {
//             name: "Orlando Magic",
//             founded: "1989",
//             location: "Orlando, Florida",
//             championships: 0,
//         },
//         "team-76ers": {
//             name: "Philadelphia 76ers",
//             founded: "1946",
//             location: "Philadelphia, Pennsylvania",
//             championships: 3,
//         },
//         "team-suns": {
//             name: "Phoenix Suns",
//             founded: "1968",
//             location: "Phoenix, Arizona",
//             championships: 0,
//         },
//         "team-blazers": {
//             name: "Portland Trail Blazers",
//             founded: "1970",
//             location: "Portland, Oregon",
//             championships: 1,
//         },
//         "team-kings": {
//             name: "Sacramento Kings",
//             founded: "1923",
//             location: "Sacramento, California",
//             championships: 1,
//         },
//         "team-spurs": {
//             name: "San Antonio Spurs",
//             founded: "1967",
//             location: "San Antonio, Texas",
//             championships: 5,
//         },
//         "team-raptors": {
//             name: "Toronto Raptors",
//             founded: "1995",
//             location: "Toronto, Ontario",
//             championships: 1,
//         },
//         "team-jazz": {
//             name: "Utah Jazz",
//             founded: "1974",
//             location: "Salt Lake City, Utah",
//             championships: 0,
//         },
//         "team-wizards": {
//             name: "Washington Wizards",
//             founded: "1961",
//             location: "Washington, D.C.",
//             championships: 1,
//         },
//         "team-nets": {
//             name: "Brooklyn Nets",
//             founded: "1967",
//             location: "Brooklyn, New York",
//             championships: 0,
//         }
//     };

//     return teamsInfo[teamId];
// }


// // Adiciona evento de clique a cada logotipo de time
// teamLogos.forEach(logo => {
//     logo.addEventListener("click", () => {
//         const teamId = logo.id;
//         const teamInfo = getTeamInfo(teamId);

//         if (teamInfo) {
//             document.getElementById("team-info").innerHTML = `
//                 <div class="team-details">
//                     <strong>Nome:</strong> ${teamInfo.name} <br>
//                     <strong>Fundado:</strong> ${teamInfo.founded} <br>
//                     <strong>Localização:</strong> ${teamInfo.location} <br>
//                     <strong>Campeonatos:</strong> ${teamInfo.championships}
//                 </div>
//             `;
//         } else {
//             document.getElementById("team-info").innerHTML = `<p>Informações do time não encontradas.</p>`;
//         }
//     });
// });
