const status = (parkingLayout) => {
  console.log(`Slot No.   Registration No        Colour`)
  for (const key in parkingLayout) {
    if (parkingLayout.hasOwnProperty(key)) {
      const element = parkingLayout[key];
      if(element) {
        console.log(element.slot.getSlot(), '        ', element.vehicle.getVehicle(), '        ', element.color.getColor())
      }
    }
  }
}

const registrationNumbersForCarsWithColour = (colorFactory, colorName) => {
  const colorObj = colorFactory.getColor(colorName)
  const log = [];
  if(colorObj) {
    const vehicles = colorObj.vehicles;
    vehicles.forEach(vehicle => {
      log.push(vehicle.getVehicle())
    });
  }
  console.log(log)
}

const slotNumbersForCarsWithColour = (colorFactory, colorName) => {
  colorObj = colorFactory.getColor(colorName)
  const log = [];
  if(colorObj) {
    const slots = colorObj.slots;
    // console.log('slots are:', slots)
    slots.forEach(slot => {
      log.push(slot.getSlot())
    });
  }
  console.log(log)
}

const slotNumberForRegistrationNumber = (parkingLayout, registrationNo) => {
  const log = []
  for (const key in parkingLayout) {
    if (parkingLayout.hasOwnProperty(key) && parkingLayout[key]) {
      const parking = parkingLayout[key]
      const vehicle = parking.vehicle;
      if(vehicle.registratioNo === registrationNo) {
        log.push(parking.slot.getSlot())
        console.log(log)
        return;
      }
    }
  }
  console.log('Not found')
}

module.exports = {
  status,
  registrationNumbersForCarsWithColour,
  slotNumbersForCarsWithColour,
  slotNumberForRegistrationNumber
}