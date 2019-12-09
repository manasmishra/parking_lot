const readline = require('readline');
const { SlotNode, SlotFactory } = require('./models/slot');
const { Color, ColorFactory } = require('./models/color')
const { Vehicle } = require('./models/vehicle')
const setters = require('./controllers/setters')
const getters = require('./controllers/getters')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const slotFactory = new SlotFactory();
const colorFactory = new ColorFactory();
let parkingLayout;
let log = []
rl.on('line', (line) => {
  // console.log(`read line is: ${line}`);
  let colorName, colorObj;
  let commands = line.split(' ');
  switch (commands[0]) {
    case 'create_parking_lot':
      let noOfParkingLots = commands[1];
      parkingLayout = setters.createParkingLot(noOfParkingLots)
      break;
    case 'park':
      const vehicleNo = commands[1]
      const color = commands[2]
      if(vehicleNo && color) {
        setters.park(parkingLayout, slotFactory, colorFactory, vehicleNo, color)
      } else {
        console.log('Please enter a valid park command as: park <registrationNo> <colorOfCar>')
      }
      break;
    case 'leave':
      // console.log('Inside leave', commands)
      let leaveSlotNo = commands[1]
      setters.leave(parkingLayout, leaveSlotNo)
      break;
    case 'status':
      getters.status(parkingLayout)
      break;
    case 'registration_numbers_for_cars_with_colour':
      // console.log('Inside registration_numbers_for_cars_with_colour', commands)
      colorName = commands[1]
      colorObj = colorFactory.getColor(colorName)
      log = [];
      if(colorObj) {
        const vehicles = colorObj.vehicles;
        vehicles.forEach(vehicle => {
          log.push(vehicle.getVehicle())
        });
      }
      console.log(log)
      break;
    case 'slot_numbers_for_cars_with_colour':
      // console.log('Inside slot_numbers_for_cars_with_colour', commands)
      colorName = commands[1]
      colorObj = colorFactory.getColor(colorName)
      log = [];
      // console.log('colorObj received for colorName:', colorName, ' is:', colorObj)
      if(colorObj) {
        const slots = colorObj.slots;
        // console.log('slots are:', slots)
        slots.forEach(slot => {
          log.push(slot.getSlot())
        });
      }
      console.log(log)
      break;
    case 'slot_number_for_registration_number':
      // console.log('Inside slot_number_for_registration_number', commands)
      let registrationNo = commands[1];
      log = []
      for (const key in parkingLayout) {
        if (parkingLayout.hasOwnProperty(key) && parkingLayout[key]) {
          const vehicle = parkingLayout[key].vehicle;
          if(vehicle.registratioNo === registrationNo) {
            log.push(parkingLayout[key].slot.getSlot())
            console.log(log)
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