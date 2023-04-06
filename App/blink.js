var Gpio=require('onoff').Gpio
var LED=new Gpio (17,'out');
var ED0=new Gpio (17,'out');
var cap=new Gpio (27,'in','both');
//ED0.writeSync(0);

var blinkInterval=setInterval(()=>{blinkLED(ED0);console.log(cap.readSync())},90);
//var blinkInterval0=setInterval(()=>blinkLED(LED),150);

function blinkLED(led){
if (cap.readSync() ===1){
led.writeSync(1);
return 1;
}
else{
led.writeSync(0);
return 0;
}
}
function endBlink(led,blink){
led.writeSync(0);
led.unexport();
}
 
setTimeout(()=>{endBlink(ED0,blinkInterval);
clearInterval(blinkInterval);}
,300000);
