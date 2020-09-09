import * as alt from 'alt-server';

alt.onClient('mtq_locksystem:setOwner', (player, vehicle) => {
    if(!vehicle.hasStreamSyncedMeta("owner")) {
        vehicle.setStreamSyncedMeta("owner", player.socialId)
    }
})