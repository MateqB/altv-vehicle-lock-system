import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('keyup', (key) => {
    if(key == 85) { // U
        if(alt.Player.local.vehicle) {
            let owner = alt.Player.local.vehicle.getStreamSyncedMeta("owner")
            if(owner) {
                if(owner == alt.Player.local.getSyncedMeta('socialid')) {
                    toggleVehicleLocks(alt.Player.local.vehicle)
                } else {
                    showNotification("", null, "CHAR_CARSITE", 7, "Lock System", "You can't find keys in the vehicle", 1)

                }
            } else {
                alt.emitServer('mtq_locksystem:setOwner', alt.Player.local.vehicle)
                showNotification("", null, "CHAR_CARSITE", 7, "Lock System", 'You found keys', 1)
            }
        } else {
            let veh = alt.Vehicle.getByScriptID(native.getClosestVehicle(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 10, 0, 70))
            if(veh) {
                let owner = veh.getStreamSyncedMeta("owner")
                if(owner) {
                    if(owner == alt.Player.local.getSyncedMeta('socialid')) {
                        toggleVehicleLocks(veh)
                    } else {
                        // Do nothing
                    }
                }
            }
        }
    }     
})

function toggleVehicleLocks(veh) {
    alt.emitServer('mtq_locksystem:toggleVehicleLocks', veh)
    // Some lights sounds idk
}

alt.onServer('mtq_locksystem:lockUpdate', (vehid, lockstate) => {
    let veh = alt.Vehicle.getByID(vehid);
    showNotification("", null, "CHAR_CARSITE", 7, "Lock System", lockstate == 1 ? 'Vehicle unlocked' : 'Vehicle locked', 1)
    if(lockstate == 1) {
        native.playVehicleDoorCloseSound(veh.scriptID, 0)
    } else {
        native.playVehicleDoorOpenSound(veh.scriptID, 0)
    }
    native.setVehicleLights(veh.scriptID, 1)
    let i = 0;
    let inter = alt.setInterval(() => {
        if(i < 4) {
            native.setVehicleLights(veh.scriptID, 2)
            alt.setTimeout(() => {
                native.setVehicleLights(veh.scriptID, 1)
            }, 200)
        } else {
            alt.clearInterval(inter);
        }
        i++;
    }, 300);
    alt.setTimeout(() => {
        alt.setTimeout(() => {
            native.setVehicleLights(veh.scriptID, 2)
            alt.setTimeout(() => {
                native.setVehicleLights(veh.scriptID, 1)
            }, 500)
        }, 500)
    }, 500)
})

function showNotification(message, backgroundColor = null, notifImage = null, iconType = 0, title = "Title", subtitle = "subtitle", durationMult = 1) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null)
        native.thefeedSetNextPostBackgroundColor(backgroundColor);
    if (notifImage != null)
        native.endTextCommandThefeedPostMessagetext(notifImage, notifImage, true, iconType, title, subtitle, durationMult);
    return native.endTextCommandThefeedPostMpticker(false, true);
}