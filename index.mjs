import * as alt from 'alt-server';

alt.onClient('mtq_locksystem:setOwner', (player, vehicle) => {
    if(!vehicle.hasStreamSyncedMeta("owner")) {
        vehicle.setStreamSyncedMeta("owner", player)
    }
})

alt.onClient('mtq_locksystem:toggleVehicleLocks', (player, vehicle) => {
    if(vehicle.lockState == 1) {
        vehicle.lockState = 2
        alt.emitClient(player, 'mtq_locksystem:lockUpdate', vehicle, vehicle.lockState)
    } else {
        vehicle.lockState = 1
        alt.emitClient(player, 'mtq_locksystem:lockUpdate', vehicle, vehicle.lockState)
    }
})