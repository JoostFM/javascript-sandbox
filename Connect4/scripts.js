function PlaceDiscEvent() {

    var value = document.querySelector("#selectedColumnId").value
    connext4.Prepare(currentplayer, value)
    connext4.Process()
    currentplayer = connext4.HandleResult()
    document.getElementById("currentPlayer").textContent = currentplayer
    Display(connext4.Grid)
}

function Display(grid) {
    for (let rowId = 0; rowId < grid.length; rowId++) {
        for (let cellId = 0; cellId < grid[rowId].length; cellId++) {
            var cell = document.getElementById("connect4-grid").rows[rowId].cells[cellId]

            switch (grid[rowId][cellId]) {
                case connext4.Players.Rood:
                    cell.className = "red";
                    break
                case connext4.Players.Geel:
                    cell.className = "yellow";
                    break
                default:
                    cell.className = ""
            }
        }
    }
}

function Connext4() {
    var currentPlayer,

        selectedColumnId,

        players = {
            Empty: "",
            Rood: "Rood",
            Geel: "Geel"
        },

        grid = [
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
            [players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty, players.Empty],
        ]

    init = function () {
        currentPlayer = players.Rood
        return currentPlayer
    },

        prepare = function (player, columnId) {
            if (player != currentPlayer) {
                alert("Wrong Player: " + player + ", let " + currentPlayer + " play")
                selectedColumnId = -1
                return
            }

            if (columnId < 1 || columnId > grid[0].length) {
                alert("Column: " + columnId + " doesnot exist")
                selectedColumnId = -1
                return
            }

            if (grid[0][columnId - 1] != players.Empty) {
                alert("Column: " + columnId + " is full")
                selectedColumnId = -1
                return
            }

            selectedColumnId = columnId
        },

        process = function () {
            console.log("Player: " + currentPlayer + "| column:" + selectedColumnId)
            if (selectedColumnId < 1) {
                return
            }

            var rowId = 0

            while (rowId < grid.length && grid[rowId][selectedColumnId - 1] == players.Empty) {
                rowId++
            }

            console.log((rowId - 1) + " " + (selectedColumnId - 1));

            grid[rowId - 1][selectedColumnId - 1] = currentPlayer
        },

        handleresult = function () {
            if (selectedColumnId > 0) {
                currentPlayer = currentPlayer == players.Rood ? players.Geel : players.Rood;
            }

            return currentPlayer;
        };

    return {
        Init: init,
        Prepare: prepare,
        Process: process,
        HandleResult: handleresult,
        Players: players,
        Grid: grid
    }
}

var connext4 = new Connext4();
var currentplayer = connext4.Init()
document.getElementById("currentPlayer").textContent = currentplayer