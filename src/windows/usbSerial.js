const { SerialPort, SerialPortMock } = require('serialport')

const getDevices = async (callback) => {
  const serial = await SerialPort.list();
  if (callback) {
    callback(serial);
  }
}
const getSerialPortData = async (comPort, callback) => {
  SerialPortMock.binding
  SerialPortMock.binding.createPort(comPort)
  let port = new SerialPortMock({ path: comPort, baudRate: 9600 })
  port.on('open', () => {
    port.port.emitData('data');
    port.on('data', function (chunk) {
      if (callback) {
        callback(chunk);
      }
    });
  })

}

module.exports = {
  getDevices,
  getSerialPortData
}