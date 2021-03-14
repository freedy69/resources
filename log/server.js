const fs = require('fs');
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let hour = dateObj.getUTCHours();
let minute = dateObj.getUTCMinutes(); 
let second = dateObj.getUTCSeconds();
let fullDate = year + "/" + month + "/" + day + ' ' + hour + ':' + minute + ':' + second + ' UTC';

on('onResourceStart', () => {
    console.log('[Log] Resource has started.');
})

on('playerConnecting', (playerName, source) => {
    console.warn(`A player is trying to connect with name: ${playerName}`)
});

RegisterNetEvent("playerJoining");
on('playerJoining', (oldID) => {
    let playerName = GetPlayerName(global.source);
    let identifiers1 = GetPlayerIdentifier(global.source, 0);
    let identifiers2 = GetPlayerIdentifier(global.source, 1);
    let identifiers3 = GetPlayerIdentifier(global.source, 2);
    let identifiers4 = GetPlayerIdentifier(global.source, 3);
    let identifiers5 = GetPlayerIdentifier(global.source, 4);
    let identifiers6 = GetPlayerIdentifier(global.source, 5);

    console.warn(`Player ${playerName} has joined with ID ${source}.`);

    if(identifiers1 || identifiers2 || identifiers3 || identifiers4 || identifiers5 || identifiers6 == null){
        console.log('Couldn\'t retrieve one or more identifiers!');
    }

    let userJoinedInfo = {
        date: `${fullDate}`,
        name: `${playerName}`,
        identifierOne: `${identifiers1}`,
        identifierTwo: `${identifiers2}`,
        identifierThree: `${identifiers3}`,
        identifierFour: `${identifiers4}`,
        identifierFive: `${identifiers5}`,
        identifierSix: `${identifiers6}`
    }

    console.log(userJoinedInfo);

    let stringLogs = JSON.stringify(userJoinedInfo, null, 4)

    fs.writeFile("./resources/log/logfiles/joins.json", stringLogs, { flag: 'a+'}, function(err, result) {
        if(err) console.log('error', err);
        console.log('Join data saved in JSON file at resource root.')
    });
})

on('playerDropped', (reason) => {
    let playerName = GetPlayerName(global.source);
    console.warn(`Player ${playerName} has dropped - ${reason}`);

    let droppedUserInfo = {
        date: `${fullDate}`,
        name: `${playerName}`,
        reason: `${reason}`
    }
    
    let dropJSON = JSON.stringify(droppedUserInfo, null, 4);

    fs.writeFile("./resources/log/logfiles/drops.json", dropJSON, { flag: 'a+'}, function(err, result) {
        if(err) console.log('error', err);
        console.log('Drop data saved in JSON file at resource root.')
    });    
})