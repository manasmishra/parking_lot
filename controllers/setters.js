const { CreateParkingLot } = require('../models/create_parking_lot')
const { Vehicle } = require('../models/vehicle')

const createParkingLot = (noOfParkingLots) => {
  if (noOfParkingLots && noOfParkingLots>0) {
    const parkingLayOut = new CreateParkingLot(noOfParkingLots)
    console.log(`Created a parking lot with ${noOfParkingLots} slots.`)
    return parkingLayOut;
  }
  console.log('Please Enter Valid no of parking slots to be created.')
  return ;
}

const park = (parkingLayout, slotFactory, colorFactory, vehicleNo, color)=> {
  for (const key in parkingLayout) {
    if (parkingLayout.hasOwnProperty(key)) {
      let element = parkingLayout[key];
      if(element === null) {
        const slotObj = slotFactory.createSlot(key);
        const colorObj = colorFactory.createColor(color);
        const vehicleObj = new Vehicle(vehicleNo, colorObj, slotObj)
        colorObj.addDetails(vehicleObj, slotObj);
        slotObj.addDetails(vehicleObj, colorObj)
        element = {
          slot: slotObj,
          color: colorObj,
          vehicle: vehicleObj
        }
        parkingLayout[key] = element;
        console.log('Allocated slot number:', slotObj.getSlot())
        return;
      }
    }
  }
  console.log('Sorry, parking lot is full');
  return;
}

const leave = (parkingLayout, leaveSlotNo) => {
  let leaveSlot = parkingLayout[leaveSlotNo];
  if(leaveSlot.vehicle) {
    // console.log('Inside leave vehicle')
    leaveSlot.vehicle.deleteVehicle()
    leaveSlot.slot.deleteDetails()
    leaveSlot.color.deleteDetails(leaveSlot.vehicle, leaveSlot.slot)
    leaveSlot.vehicle = null;
    delete leaveSlot.vehicle;
    delete leaveSlot.slot
    delete leaveSlot.color
  }
  parkingLayout[leaveSlotNo] = null;
  console.log(`Slot number ${leaveSlotNo} is free`)
  return;
}

module.exports = {
  createParkingLot,
  park,
  leave
}