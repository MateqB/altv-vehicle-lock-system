import * as chat from 'chat'
import * as alt from 'alt'
const CarDataArray = []

export async function CreateVehicle(vehicle) {
    const carData = { car: vehicle, owner: null }
    await CarDataArray.push(carData)
    console.log(carData.car)
    console.log(carData.owner)
}

export async function SetOwner(player, vehicle) {
    const carObject = await CarDataArray.find(car => car.car === vehicle.id)
    carObject.owner = player.name
} 
export async function IsOwner(player, vehicle) {
    const carObject = await CarDataArray.find(car => car.car === vehicle.id)
        if(carObject.owner === player.name) {
            return(true)
        }
        if(carObject.owner !== player.name) {
            return(false)
        }
    }
    export async function GetOwner(vehicle) {
        const carObject = await CarDataArray.find(car => car.car === vehicle.id)
                return(carObject.owner)
        }
        export async function GetVehicle(vehicle) {
            let data = { car: null, owner: null }
            const carObject = await CarDataArray.find(car => car.car === vehicle.id)
            data.car = carObject.car
            data.owner = carObject.owner
                    return(data)
            }
export function Distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) +
            Math.pow(vector1.y - vector2.y, 2) +
            Math.pow(vector1.z - vector2.z, 2)
    );
}
export function getClosestVehicleByPlayer(player) {
    let data = { vehicle: null, distance: 0};
    alt.Vehicle.all.forEach(vehicle => {
        let dis = Distance(player.pos, vehicle.pos)

        if(dis < data.distance || data.distance == 0) {
            data = { vehicle: vehicle, distance: dis}
        }
    })
    return data;
}
        alt.onClient('mtq:lockSystem', async (player) => {
            let veh = await getClosestVehicleByPlayer(player).vehicle
            const ownerbl = await IsOwner(player, veh)
            console.log(ownerbl)
            if(player.vehicle) {
                if(ownerbl) {
                    alt.emitClient(player, 'mtq:locktoggle', player.vehicle.lockState)
                } 
                if(ownerbl === false) {
                    const owner = await GetOwner(veh)
                    if(owner === null) {
                        console.log(`${player.name} is owner of this vehicle`)
                        alt.emitClient(player, 'mtq:notify', 'You found keys in the vehicle')
                        SetOwner(player, veh)
                    } else {
                        console.log(`${player.name} is not owner of this vehicle`)
                    }
                }
            } else {
                if(ownerbl) {
                    let car = await getClosestVehicleByPlayer(player).vehicle
                    console.log(car)
                    alt.emitClient(player, 'mtq:locktoggle', car.lockState)
                }
            }
            return
        })