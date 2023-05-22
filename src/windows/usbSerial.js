const { SerialPort, SerialPortMock } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
var serialport;
const getDevices = async (callback) => {
  const serial = await SerialPort.list();
  if (callback) {
    callback(serial);
  }
};

const serialPortOpen = async (comPort, callback) => {
  const parser = new ReadlineParser({ delimiter: '\r\n' });
  const config = {
    path: comPort,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    autoOpen: false
  };
  serialport = new SerialPort(config);
  if( !serialport.isOpen){
  serialport.open(async err => {
    if (err) {
      callback(err)
    } else {
      serialport.set({ dtr: true, rts: true })
      serialport?.emit('data')
      if (callback) {
        callback("port open")
      }
    };
  });
  } else{
    if (callback) {
      callback("port already open!")
    }
  }
  
};

const closePort = (callback) => {
  if( serialport.isOpen){
    serialport.close(function () {
      if (callback) {
        callback("disconnected");
      }
    });
  }else{
    if (callback) {
      callback("port already closed!");
    }
  }

}

const listenData =(callback)=>{
  serialport?.on('data', (data) => {
    if(callback){
      callback(data)
    }
  })
}

module.exports = {
  getDevices,
  serialPortOpen,
  closePort,
  listenData,
}