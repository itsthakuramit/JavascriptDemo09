function getAllPlayers() {

    let response = fetch('http://localhost:3000/players')

    response
        .then((data) => {
            return data.json();
        })
        .then((players) => {
            let playerlist = '';
            players.forEach(player => {
                playerlist += `<tr>
                    <td>${player.id}</td>
                    <td>${player.playername}</td>
                    <td>${player.sports}</td>
                    <td>
                        <input type="button" onclick="editPlayer('${player.id}','${player.playername}','${player.sports}')" value="Edit" /></td>
                    </td>
                    <td>
                        <input type="button" onclick="deletePlayer('${player.id}')" value="Delete" /></td>
                    </td>
                    </tr>`
            });

            document.getElementById("playerlist").innerHTML =
                `<table border=\"2\"><tr><td>PlayerId</td><td>Player Name</td><td>Sports</td></tr>${playerlist}</table>`;
        })
        .catch((err) => {
            console.log(err)
        });

}

getAllPlayers();

function getPlayerById(playerid) {

    return fetch(`http://localhost:3000/players/${playerid}`, {
        method: 'GET'
    });

}


function deletePlayer(playerid) {

    let response = fetch(`http://localhost:3000/players/${playerid}`, {
        method: 'DELETE'
    });

    response
        .then((data) => {
            getAllPlayers();
        })
        .catch((error) => {
            console.log(error)
        })

}

function addPlayer() {

    let newplayerid = document.getElementById("id").value;
    let newplayername = document.getElementById("name").value;
    let newsports = document.getElementById("sports").value;

    let newPlayer = {
        "id": newplayerid,
        "playername": newplayername,
        "sports": newsports
    }

    console.log(newplayerid)
    getPlayerById(newPlayer.id)
        .then((data) => data.json())
        .then((existingPlayer) => {
            console.log(existingPlayer.id)
            if (existingPlayer.id === undefined) {
                let response = fetch('http://localhost:3000/players', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPlayer)
                });

                response
                    .then((data) => {
                        getAllPlayers();
                        clearForm();
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                updatePlayer();
            }

        })
        .catch((error) => {
            console.log(error)
        })



}


function updatePlayer() {

    let playertobeupdated = {
        "id": document.getElementById("id").value,
        "playername": document.getElementById("name").value,
        "sports": document.getElementById("sports").value
    }

    let response = fetch(`http://localhost:3000/players/${playertobeupdated.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playertobeupdated)
    });

    response
        .then((data) => {
            getAllPlayers();
            clearForm();
        })
        .catch((error) => {
            console.log(error)
        })

}

function editPlayer(id,playername,sports) {
    document.getElementById("id").value = id;
    document.getElementById("id").disabled=true; 
    document.getElementById("name").value = playername;
    document.getElementById("sports").value = sports;
}


function clearForm() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("sports").value = '';
}
