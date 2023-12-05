import * as fs from 'fs';

interface Game {
    id: number,
    usedCubesInGame: Record<string, number>
};

let sumOfIds: number = 0;

const newLine = '\r\n';
const setSeparator = ';';
const gameSeparator = ':';

const red = 'red';
const blue = 'blue';
const green = 'green';

const availableRedCubes = 12;
const availableGreenCubes = 13;
const availableBlueCubes = 14;

const file: Buffer = fs.readFileSync('./input.txt');
const games: Game[] = separeteGames(file);

const availableCubes: Record<string, number> = {
    red: availableRedCubes,
    green: availableGreenCubes,
    blue: availableBlueCubes
};

function separeteGames(file: Buffer): Game[] {
    const gamesAsString = file.toString().split(newLine);
    let games: Game[] = [];

    gamesAsString.forEach(gameAsString => {
        const parts = gameAsString.split(gameSeparator);

        const id = parts[0].trim().replace('Game', '');

        let numberOfRedCubes: number = 0;
        let numberOfGreenCubes: number = 0;
        let numberOfBlueCubes: number = 0;

        const sets = parts[1].split(setSeparator);

        sets.forEach(set => {
            const allCubes = set.split(',');
            allCubes.forEach(cubesOfSameColor => {
                numberOfRedCubes = countCubesOfColor(red, cubesOfSameColor, numberOfRedCubes);
                numberOfGreenCubes = countCubesOfColor(green, cubesOfSameColor, numberOfGreenCubes);
                numberOfBlueCubes = countCubesOfColor(blue, cubesOfSameColor, numberOfBlueCubes);
            })
        })

        const game = {
            id: Number(id), usedCubesInGame: {
                red: numberOfRedCubes,
                green: numberOfGreenCubes,
                blue: numberOfBlueCubes
            }
        }
        games.push(game);
    });
    return games
};

function countCubesOfColor(color: string, cubeOfColor: string, currentCubeNumber: number): number {
    if (cubeOfColor.includes(color)) {
        const amountAsString = cubeOfColor.trim().replace(color, '');
        return returnMaxNumber(currentCubeNumber, Number(amountAsString))
    } else {
        return currentCubeNumber
    }
}

function returnMaxNumber(numberOne: number, numberTwo: number): number {
    const result = numberOne > numberTwo ? numberOne : numberTwo;
    return result
}

function calculatePossibleGames(games: Game[]): Game[] {
    let possibleGames: Game[] = []
    games.forEach(game => {
        if (game.usedCubesInGame[red] <= availableCubes[red] && game.usedCubesInGame[green] <= availableCubes[green] && game.usedCubesInGame[blue] <= availableCubes[blue]) {
            possibleGames.push(game)
        }
    })
    return possibleGames
}

const possibleGames = calculatePossibleGames(games);

function calculatesumOfIds(games: Game[]): number {
    let amount: number = 0;
    const ids = games.map(game => game.id);
    ids.forEach(id => amount += id);
    return amount
}

sumOfIds = calculatesumOfIds(possibleGames);

console.log('What is the sum of the power of these sets?')
console.log('Answer: ', sumOfIds)
