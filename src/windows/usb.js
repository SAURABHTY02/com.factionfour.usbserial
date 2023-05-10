const { WebUSB, usb } = require('usb');

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

module.exports = {
  usbDevices,
  useEvent:usb
}