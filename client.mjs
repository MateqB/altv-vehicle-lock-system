import game from 'natives';
import * as alt from 'alt'
function showNotification(message, backgroundColor = null, notifImage = null, iconType = 0, title = "Title", subtitle = "subtitle", durationMult = 1) {
    game.setNotificationTextEntry('STRING');
    game.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null)
        game.setNotificationBackgroundColor(backgroundColor);
    if (notifImage != null)
        game.setNotificationMessage4(notifImage, notifImage, true, iconType, title, subtitle, durationMult);
    return game.drawNotification(false, true);
}
alt.log('Loaded: vehicle-mods->client/engine.mjs')
alt.on('keydown', async (key) => {
    if (key === 'U'.charCodeAt(0)) {
                   alt.emitServer('mtq:lockSystem')
    }
})
alt.onServer('mtq:notify', (notification) => {
    showNotification(`${notification}`, null, "CHAR_LIFEINVADER", 7, "VehicleLockSys", "by Mateq#0001", 1);
})
alt.onServer('mtq:locktoggle', (lockstate) => {
    const pos = alt.Player.local.pos;
    const veh = game.getClosestVehicle(pos.x, pos.y, pos.z, 10, 0, 70)
    // dziwiek PlayVehicleDoorOpenSound
    if(lockstate === 1) {
        game.setVehicleDoorsLocked(veh, 2)
        game.setVehicleLights(veh, 2)
        game.playVehicleDoorCloseSound(veh, 0)
        alt.setTimeout(() => {
            game.setVehicleLights(veh, 1)
            alt.setTimeout(() => {
                game.setVehicleLights(veh, 2)
                alt.setTimeout(() => {
                    game.setVehicleLights(veh, 1)
                }, 100)
            }, 100)
        }, 100)
        showNotification(`Vechicle locked`, null, "CHAR_LIFEINVADER", 7, "VehicleLockSys", "by Mateq#0001", 1);
    }
    if(lockstate === 2) {
        game.setVehicleDoorsLocked(veh, 1)
        game.setVehicleLights(veh, 2)
        game.playVehicleDoorOpenSound(veh, 0)
        alt.setTimeout(() => {
            game.setVehicleLights(veh, 1)
            alt.setTimeout(() => {
                game.setVehicleLights(veh, 2)
                alt.setTimeout(() => {
                    game.setVehicleLights(veh, 1)
                }, 100)
            }, 100)
        }, 100)
        showNotification(`Vechicle unlocked`, null, "CHAR_LIFEINVADER", 7, "VehicleLockSys", "by Mateq#0001", 1);
    }
})
