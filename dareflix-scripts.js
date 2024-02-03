var dares_json;
var lobbyId;
var lobby;
var lobbies;
var usrIndex;

function bodyOnload() {
    // lobbyId = 0;
    // enterLobby();
    // return false;
}


function enterLobby() {
    lobbyId = document.getElementById("lobbyId").value;
    if (lobbies == null || lobbies[lobbyId] == null) {
        invalidLobby();
        return false;
    }

    lobby = lobbies[lobbyId];
    usrIndex = 0;
    for (; usrIndex < 1000; usrIndex++) {
        if (lobby[usrIndex] == null) {
            break;
        }
    }
    if (usrIndex == 1000) {
        // console.log("Couldn't find usrIndex");
    } else { // success
        lobby[usrIndex] = {
            "dares":[],
            "points":"0"
        }
        // console.log("Found usrIndex");
        switchToDares();
    }
    return false;
}
function submitText() {
    let playerId = document.getElementById("playerId").value;
    let textInput = document.getElementById("textInput").value;
    // Create a JSON object with player ID and submitted text
    let jsonData = {
        lobbyId: lobbyId,
        textInput: textInput
    };
    // Convert JSON object to a string
    let jsonString = JSON.stringify(jsonData);
    // Simulate sending data to a server or writing to a file
    console.log("JSON Data:", jsonString);
}
function switchToDares() {
    document.getElementById("lobby").style.display = "none";
    genDares();
}

function genDares() {
    document.getElementById("dares").style.display = "block";
    addDareLine();
}
function addDareLine() {
    let daresDiv = document.getElementById("daresDiv");
    let dareLine = daresDiv.appendChild(document.createElement("div"));
    dareLine.className = "dareLine";
    dareText = dareLine.appendChild(document.createElement("input"));
    dareText.type = "text";
    dareText.className = "dareText";
    dareText.placeholder = "Enter dare here";
    dareAdd = dareLine.appendChild(document.createElement("button"));
    dareAdd.className = "dareAdd";
    dareAdd.innerText = "Add";
    let index = daresDiv.children.length;
    dareAdd.onclick = function () {addDare(this, index);};
}

function addDare(addButton, index) {
    lobby[usrIndex]["dares"][index] = addButton.parentNode.children[0].value;
    addButton.innerText = "Update";
}

function submitDares() {
    let xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.onstatechange = function () {
        alert("DONE");
    }
    xhr.open('POST', '/json_handler', true);
    xhr.send(lobbies);
}

function invalidLobby() {
    document.getElementById("invalidLobby").style.display="inline";
}

// function enterDare() {

// }