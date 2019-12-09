const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
class Vehicle {
  constructor(registratioNo, color = null, slot = null) {
    this.registratioNo = registratioNo;
    this.color = color
    this.slot = slot
  }
  getVehicle(){
    return this.registratioNo;
  }
  deleteVehicle() {
    this.color = null;
    this.slot = null;
    this.registratioNo = null
    delete this.color
    delete this.slot
    // delete this.registratioNo
  }
}
class SlotNode {
  constructor(parkingNo, vehicle = null, color = null) {
    this.slotNo = parkingNo;
    this.vehicle = vehicle;
    this.color = color
  }
  addDetails(vehicle = null, color = null) {
    this.vehicle = vehicle
    this.color = color
  }
  getSlot(){
    return this.slotNo;
  }
  deleteDetails() {
    this.slotNo = null;
    this.vehicle = null;
    this.color = null;
    delete this.vehicle;
    delete this.color;
  }
}
class SlotFactory {
  constructor() {
    this.slots = []
  }
  createSlot(slotNo, vehicle = null, color = null) {
    let slot = this.getSlot(slotNo);
    if(slot) {
      return slot;
    } else {
      const newSlot = new SlotNode(slotNo, vehicle, color);
      this.slots.push(newSlot)
      return newSlot
    }
  }
  getSlot(slotNo) {
    return this.slots.find(slot => slot.slotNo === slotNo)
  }
}
class Color {
  constructor(color, vehicle=null, slot=null) {
    this.colorName = color;
    this.vehicles = vehicle ? [vehicle] : []
    this.slots = slot ? [slot] : []
  }
  addDetails(vehicle, slot) {
    this.vehicles.push(vehicle)
    this.slots.push(slot)
  }
  getColor() {
    return this.colorName
  }
  deleteDetails(vehicle, slot) {
    for(let i=0; i< this.vehicles.length; i++) {
      let _vehicle = this.vehicles[i];
      let _slot = this.slots[i];
      // console.log('Inside color deleteDetails _vehicle to be deleted is:', _vehicle, ' vehicle is:', vehicle)
      // console.log('Inside color deleteDetails _slot to be deleted is:', _slot, ' slot is:', slot)
      if(_vehicle.registratioNo === vehicle.registratioNo) {
        _vehicle.deleteVehicle();
        delete this.vehicles[i];
        this.vehicles.splice(i,1)
      }
      if(_slot.slotNo === slot.slotNo) {
        _slot.deleteDetails();
        delete this.slots[i];
        this.slots.splice(i,1)
      }
    }
  }
}
class ColorFactory {
  constructor() {
    this.colors = []
  }
  createColor(colorName, vehicle = null, slot = null) {
    let color = this.getColor(colorName);
    if(color) {
      return color;
    } else {
      const newColor = new Color(colorName, vehicle, slot);
      this.colors.push(newColor)
      return newColor
    }
  }
  getColor(colorName) {
    return this.colors.find(color => color.colorName === colorName)
  }
  
}
// console.log()
let slotFactory = new SlotFactory();
const colorFactory = new ColorFactory();
const parkingLayout = {}
rl.on('line', (line) => {
  // console.log(`read line is: ${line}`);
  let colorName, colorObj;
  let commands = line.split(' ');
  switch (commands[0]) {
    case 'create_parking_lot':
      let noOfParkingLots = commands[1];
      for(let i=1; i<=noOfParkingLots; i++){
        parkingLayout[i] = null;
      }
      console.log(`Created a parking lot with ${noOfParkingLots} slots.`)
      break;
    case 'park':
      const vehicleNo = commands[1]
      const color = commands[2]
      if(vehicleNo && color) {
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
        console.log('Sorry, parking lot is full')
      } else {
        console.log('Please enter a valid park command as: park <registrationNo> <colorOfCar>')
      }
      break;
    case 'leave':
      // console.log('Inside leave', commands)
      let leaveSlotNo = commands[1]
      let leaveSlot = parkingLayout[leaveSlotNo];
      if(leaveSlot.vehicle) {
        // console.log('Inside leave vehicle')
        leaveSlot.vehicle.deleteVehicle()
        leaveSlot.slot.deleteDetails()
        leaveSlot.color.deleteDetails(leaveSlot.vehicle, leaveSlot.slot)
        parkingLayout[leaveSlotNo].vehicle = null;
        delete parkingLayout[leaveSlotNo].vehicle;
        delete parkingLayout[leaveSlotNo].slot
        delete parkingLayout[leaveSlotNo].color
      }
      parkingLayout[leaveSlotNo] = null;
      // console.log('parkinglayout after leave is:', parkingLayout)
      break;
    case 'status':
      // console.log('Inside status', commands)
      for (const key in parkingLayout) {
        if (parkingLayout.hasOwnProperty(key)) {
          const element = parkingLayout[key];
          if(element) {
            console.log(element.slot.getSlot(), '        ', element.vehicle.getVehicle(), '      ', element.color.getColor())
          }
        }
      }
      break;
    case 'registration_numbers_for_cars_with_colour':
      // console.log('Inside registration_numbers_for_cars_with_colour', commands)
      colorName = commands[1]
      colorObj = colorFactory.getColor(colorName)
      if(colorObj) {
        const vehicles = colorObj.vehicles;
        vehicles.forEach(vehicle => {
          console.log(vehicle.getVehicle(), ', ')
        });
      }
      break;
    case 'slot_numbers_for_cars_with_colour':
      // console.log('Inside slot_numbers_for_cars_with_colour', commands)
      colorName = commands[1]
      colorObj = colorFactory.getColor(colorName)
      // console.log('colorObj received for colorName:', colorName, ' is:', colorObj)
      if(colorObj) {
        const slots = colorObj.slots;
        // console.log('slots are:', slots)
        slots.forEach(slot => {
          console.log(slot.getSlot(), ', ')
        });
      }
      break;
    case 'slot_number_for_registration_number':
      // console.log('Inside slot_number_for_registration_number', commands)
      let registrationNo = commands[1];
      for (const key in parkingLayout) {
        if (parkingLayout.hasOwnProperty(key) && parkingLayout[key]) {
          const vehicle = parkingLayout[key].vehicle;
          if(vehicle.registratioNo === registrationNo) {
            console.log(parkingLayout[key].slot.getSlot())
            return;
          }
        }
      }
      console.log('Not found')
      break;
    case 'exit':
      process.exit(0)
      break;
    default:
      console.log('Please Enter a valid command.')
      break;
  }
}).on('close', () => {
  process.exit(0)
})