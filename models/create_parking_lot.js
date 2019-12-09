class CreateParkingLot {
  constructor(noOfParkings) {
    if(CreateParkingLot.instance) {
      return CreateParkingLot.instance
    } else {
      CreateParkingLot.instance = {}
      for (let i = 1; i <= noOfParkings; i++) {
        CreateParkingLot.instance[i] = null;
      }
      return CreateParkingLot.instance
    }
  }
}

module.exports = {
  CreateParkingLot
}