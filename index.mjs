import * as alt from 'alt-server';

alt.onClient('mtq_locksystem:setOwner', (player, vehicle) => {
    if(!player.hasSyncedMeta('socialid')) {
        player.setSyncedMeta('socialid', player.socialId)
    }
    if(!vehicle.hasStreamSyncedMeta("owner")) {
        vehicle.setStreamSyncedMeta("owner", player.socialId)
    }
})

alt.onClient('mtq_locksystem:toggleVehicleLocks', (player, vehicle) => {
    console.log(vehicle.lockState)
    if(vehicle.lockState == 1) {
        vehicle.lockState = 2
        alt.emitClient(player, 'mtq_locksystem:lockUpdate', vehicle.id, vehicle.lockState)
    } else {
        vehicle.lockState = 1
        alt.emitClient(player, 'mtq_locksystem:lockUpdate', vehicle.id, vehicle.lockState)
    }
})