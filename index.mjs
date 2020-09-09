import * as alt from 'alt-server';

alt.onClient('mtq_locksystem:setOwner', (player, vehicle) => {
    if(!vehicle.hasStreamSyncedMeta("owner")) {
        vehicle.setStreamSyncedMeta("owner", player.socialId)
    }
})

alt.onClient('mtq_locksystem:toggleVehicleLocks', (player, vehicle) => {
    if(vehicle.lockState == 2) {
        vehicle.lockState = 1
    } else {
        vehicle.lockState = 2
    }
})