module.exports = app =>{ 

var router = require ("express").Router()
var Gpio=require('onoff').Gpio
let ontimeout;
let stat=0
let cap

router.post('/on',async  (req, res,next) => {

    let ledo = req.body.led;
    cap=ledo;
    const led = new Gpio(ledo, 'out','both'); 
  let stopBlinking = false;

// Toggle the state of the LED connected to GPIO17 every 200ms
const blinkLed = _ => {
  if (stopBlinking) {
    return led.unexport();
  }

  led.read()
    .then((value) => {led.write(1); 
        res.status(200).send ({msg:1});
        stat=1
        })
  // .then(_ => setTimeout(blinkLed, 200))
    .catch(err => console.log(err));
};

 blinkLed();

// Stop blinking the LED after 5 seconds
 ontimeout=setTimeout(()=>  {
    stopBlinking=true
    led.write(0);
     stat=0
    }     
, 30000);
});

 

// Ecoute de l'adresse /off (en local http://localhost:8080/off)

// Eteint la LED

router.post('/off', function(req, res,next) {
    clearTimeout(ontimeout);
    let ledo = req.body.led;
      cap=ledo;
     const led = new Gpio(ledo, 'out','both'); 
   led.read()
    .then((value) => {led.write(0); 
        res.status(200).send ({msg:0});
        stat=0
        })
  // .then(_ => setTimeout(blinkLed, 200))
    .catch(err => console.log(err));
      
      

});
router.post('/read', async(req, res, next)=> {
    let ledo = req.body.led;
    let cap1=new Gpio (ledo,'in')
       
        res.status(200).send ({msg:stat,cap:cap, cap1:cap1.readSync()});
        
   

});
router.get('/', function(req, res) {
     

    res.status(200).send({msg:'ok la LED'});

    

});
var errorFilter = function(err, req, res, next){
    logger.warn(err.stack); //the stack is actually not going to be helpful in a timeout
    if(!res.headersSent){ //just because of your current problem, no need to exacerbate it.
        errcode = err.status || 500; //err has status not statusCode
        msg = err.message || 'server error!';
        res.status(errcode).send(msg); //the future of send(status,msg) is hotly debated
};} 
app.use(errorFilter);
app.use('/api/led',router);

};

