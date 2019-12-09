const readline = require('readline');
const fs = require('fs')
const { SlotFactory } = require('./models/slot');
const { ColorFactory } = require('./models/color')
const setters = require('./controllers/setters')
const getters = require('./controllers/getters')

const slotFactory = new SlotFactory();
const colorFactory = new ColorFactory();
let parkingLayout;
const fileName = process.argv[2];

const rl = readline.createInterface({
  input: fileName ? fs.createReadStream(fileName) : process.stdin
});

rl.on('line', (line) => {
  processCommands(line)
}).on('close', () => {
  process.exit(0)
})

const processCommands = (line) => {
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
      colorName = commands[1]
      getters.registrationNumbersForCarsWithColour(colorFactory, colorName)
      break;
    case 'slot_numbers_for_cars_with_colour':
      colorName = commands[1]
      getters.slotNumbersForCarsWithColour(colorFactory, colorName)
      break;
    case 'slot_number_for_registration_number':
      let registrationNo = commands[1];
      getters.slotNumberForRegistrationNumber(parkingLayout, registrationNo)
      break;
    case 'exit':
      process.exit(0)
      break;
    default:
      console.log('Please Enter a valid command.')
      break;
  }
}