const { WebUSB, usb } = require('usb');
const { SerialPort, SerialPortMock } = require('serialport')

const usbDevices = async (callback) => {
  const customWebUSB = new WebUSB({
    devicesFound: devices => devices
  });

  const devices = await customWebUSB.requestDevice({
    filters: [{}]
  })
  callback(devices);
  return devices;
};

const getAllSerialPort=async (callback)=>{
  const serial = await SerialPort.list();
  if(callback){
    callback(serial);
  }
}
const getSerialPortData = async (port,callback) => {
  SerialPortMock.binding
  SerialPortMock.binding.createPort(port)
   port = new SerialPortMock({ path: port, baudRate: 9600 })

   port.on('open', () => {
    setInterval(()=>{
      port.on('data', function(chunk) {
        if(callback){
          callback(chunk);
        }
      });
    },1000);
   })
  
}

module.exports = {
  usbDevices,
  useEvent:usb,
  getSerialPortData,
  getAllSerialPort
}