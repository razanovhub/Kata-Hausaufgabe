"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
;
var sumOfIds = 0;
var newLine = '\r\n';
var setSeparator = ';';
var gameSeparator = ':';
var red = 'red';
var blue = 'blue';
var green = 'green';
var availableRedCubes = 12;
var availableGreenCubes = 13;
var availableBlueCubes = 14;
var file = fs.readFileSync('./input.txt');
var games = separeteGames(file);
var availableCubes = {
    red: availableRedCubes,
    green: availableGreenCubes,
    blue: availableBlueCubes
};
function separeteGames(file) {
    var gamesAsString = file.toString().split(newLine);
    var games = [];
    gamesAsString.forEach(function (gameAsString) {
        var parts = gameAsString.split(gameSeparator);
        var id = parts[0].trim().replace('Game', '');
        var numberOfRedCubes = 0;
        var numberOfGreenCubes = 0;
        var numberOfBlueCubes = 0;
        var sets = parts[1].split(setSeparator);
        sets.forEach(function (set) {
            var allCubes = set.split(',');
            allCubes.forEach(function (cubesOfSameColor) {
                numberOfRedCubes = countCubesOfColor(red, cubesOfSameColor, numberOfRedCubes);
                numberOfGreenCubes = countCubesOfColor(green, cubesOfSameColor, numberOfGreenCubes);
                numberOfBlueCubes = countCubesOfColor(blue, cubesOfSameColor, numberOfBlueCubes);
            });
        });
        var game = {
            id: Number(id), usedCubesInGame: {
                red: numberOfRedCubes,
                green: numberOfGreenCubes,
                blue: numberOfBlueCubes
            }
        };
        games.push(game);
    });
    return games;
}
;
function countCubesOfColor(color, cubeOfColor, currentCubeNumber) {
    if (cubeOfColor.includes(color)) {
        var amountAsString = cubeOfColor.trim().replace(color, '');
        return returnMaxNumber(currentCubeNumber, Number(amountAsString));
    }
    else {
        return currentCubeNumber;
    }
}
function returnMaxNumber(numberOne, numberTwo) {
    var result = numberOne > numberTwo ? numberOne : numberTwo;
    return result;
}
function calculatePossibleGames(games) {
    var possibleGames = [];
    games.forEach(function (game) {
        if (game.usedCubesInGame[red] <= availableCubes[red] && game.usedCubesInGame[green] <= availableCubes[green] && game.usedCubesInGame[blue] <= availableCubes[blue]) {
            possibleGames.push(game);
        }
    });
    return possibleGames;
}
var possibleGames = calculatePossibleGames(games);
function calculatesumOfIds(games) {
    var amount = 0;
    var ids = games.map(function (game) { return game.id; });
    ids.forEach(function (id) { return amount += id; });
    return amount;
}
sumOfIds = calculatesumOfIds(possibleGames);
console.log('What is the sum of the power of these sets?');
console.log('Answer: ', sumOfIds);
