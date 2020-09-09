import * as alt from 'alt-client';

alt.on('keyup', (key) => {
    if(key == 85) { // U
        if(alt.Player.local.vehicle) {
            let owner = alt.Player.local.vehicle.getStreamSyncedMeta("owner")
            if(owner) {
                if(owner == alt.Player.local.socialId) {
                    toggleVehicleLocks()
                } else {
                    // Show "You're not an owner" notification
                }
            } else {
                alt.emitServer('mtq_locksystem:setOwner', alt.Player.local.vehicle)
                    // Show "You found keys" notification
            }
        }
    }     
})

function toggleVehicleLocks() {
    
}
