import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('keyup', (key) => {
    if(key == 85) { // U
        if(alt.Player.local.vehicle) {
            let owner = alt.Player.local.vehicle.getStreamSyncedMeta("owner")
            if(owner) {
                if(owner.id == alt.Player.local.id) {
                    toggleVehicleLocks(alt.Player.local.vehicle)
                } else {
                    showNotification("", null, "CHAR_CARSITE", 7, "Lock System", "You can't find keys in the vehicle", 1)
                }
            } else {
                alt.emitServer('mtq_locksystem:setOwner', alt.Player.local.vehicle)
                showNotification("", null, "CHAR_CARSITE", 7, "Lock System", 'You found keys', 1)
            }
        } else {
            let veh = getClosestVehicle();
            if(veh) {
                let owner = veh.getStreamSyncedMeta("owner")
                if(owner) {
                    if(owner.id == alt.Player.local.id) {
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

alt.onServer('mtq_locksystem:lockUpdate', (veh, lockstate) => {;
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

function distance(vector1, vector2) {
    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

function getClosestVehicle(range = 10) {
    let closest = null, lastDist = 999, dist;
    for(let vehicle of alt.Vehicle.all) {
        if(vehicle.scriptID === 0) continue;
        dist = distance(alt.Player.local.pos, vehicle.pos);
        if(dist <= range && dist < lastDist) {
            lastDist = dist;
            closest = vehicle;
        }
    }
    return vehicle;
}