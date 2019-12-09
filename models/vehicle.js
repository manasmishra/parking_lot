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
  }
}

module.exports = {
  Vehicle
}