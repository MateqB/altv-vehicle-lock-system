# Mateq LockSystem
!!! READ
You need to execute function every time vehicle is created on server-side!
Function:
``CreateVehicle(vehicle.id)``
Usage:
      ``  chat.registerCommand('car', async (player, text) => {
            const car = new alt.Vehicle(
                text,
                player.pos.x,
                player.pos.y,
                player.pos.z,
                0,
                0,
                0
            )
           alt.emitClient(player, 'car', auto)
           await CreateVehicle(car.id)
        }, 1, 'car', '/car policemustwincar')``
       
       
All functions: 

``SetOwner(player, vehicle) // Arg vehicle is an object

IsOwner(player, vehicle) // returns true/false

GetOwner(vehicle) // returns player object

GetVehicle(vehicle) // returns vehicle id + owner player object - If car doesn't have an owner, owner === null


``
