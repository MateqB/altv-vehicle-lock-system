import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('keyup', (key) => {
    if(key == 85) { // U
        if(alt.Player.local.vehicle) {
            let owner = alt.Player.local.vehicle.getStreamSyncedMeta("owner")
            if(owner) {
                if(owner == alt.Player.local.socialId) {
                    toggleVehicleLocks(alt.Player.local.vehicle)
                } else {
                    // Show "You're not an owner" notification
                }
            } else {
                alt.emitServer('mtq_locksystem:setOwner', alt.Player.local.vehicle)
                    // Show "You found keys" notification
            }
        } else {
            let veh = alt.Vehicle.getByScriptID(native.getClosestVehicle(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 30, 0, 70))
            if(veh) {
                let owner = veh.getStreamSyncedMeta("owner")
                if(owner) {
                    if(owner == alt.Player.local.socialId) {
                        toggleVehicleLocks(veh)
                    } else {
                        // Show "You're not an owner" notification
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
