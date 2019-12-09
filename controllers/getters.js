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

module.exports = {
  status
}