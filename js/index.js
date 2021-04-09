async function getAllPlayers() {

    try {
        let response = await fetch('http://localhost:3000/players')
        let players = await response.json();

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
    } catch (error) {
        console.log(error)
    }
}


getAllPlayers();

async function getPlayerById(playerid) {

    let response = await fetch(`http://localhost:3000/players/${playerid}`, {
        method: 'GET'
    });

    return response;

}


async function deletePlayer(playerid) {

    let response = await fetch(`http://localhost:3000/players/${playerid}`, {
        method: 'DELETE'
    });

    getAllPlayers();

}

async function addPlayer() {

    let newplayerid = document.getElementById("id").value;
    let newplayername = document.getElementById("name").value;
    let newsports = document.getElementById("sports").value;

    let newPlayer = {
        "id": newplayerid,
        "playername": newplayername,
        "sports": newsports
    }


    console.log(newPlayer)
    let response = await getPlayerById(newPlayer.id);
    let existingPlayer = await response.json();
    console.log(existingPlayer)
    if (existingPlayer.id === undefined) {
        let response = await fetch('http://localhost:3000/players', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        });

        getAllPlayers();
        clearForm();
    } else {
        updatePlayer();
    }
}


async function updatePlayer() {

    let playertobeupdated = {
        "id": document.getElementById("id").value,
        "playername": document.getElementById("name").value,
        "sports": document.getElementById("sports").value
    }

    let response = await fetch(`http://localhost:3000/players/${playertobeupdated.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playertobeupdated)
    });
    getAllPlayers();
    clearForm();

}

function editPlayer(id, playername, sports) {
    document.getElementById("id").value = id;
    document.getElementById("id").disabled = true;
    document.getElementById("name").value = playername;
    document.getElementById("sports").value = sports;
}


function clearForm() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("sports").value = '';
}
