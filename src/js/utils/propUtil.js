const host='192.168.2.21';
const port='9999';
class properties{
    config(){
        return {
            clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
            username:'root',
            password:'root',
            keepalive: 30,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: false,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: "WillMsg",
                payload: "Connection Closed abnormally..!",
                qos: 0,
                retain: false,
            },
            rejectUnauthorized: false
        }
    }
    hosts(){
        return 'ws://'+host+':'+port;
    }
}

let  prop=new  properties();
let  options=prop.config();
let  url=prop.hosts();
var  config={
    url,options
}
export  default config;