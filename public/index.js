'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];



//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

//Step1
function getObj(id) {
  var i = 0;
for (i = 0; i < bars.length; i++) {
  if(id == bars[i].id) return bars[i];
}
return null;
}

function bookingPrice(id, nbrPerson, time) {
  var obj = getObj(id);
  var price = 0;
  if(obj != null)
  {
    price = obj.pricePerHour * time + obj.pricePerPerson * nbrPerson;
  }
  return price;
}

function setPrice()
{
  for(var i = 0; i < events.length; i++)
  {
    events[i].price = bookingPrice(events[i].barId, events[i].persons, events[i].time);
  }
}

//Step2
function decreasing()
{
  for(var i = 0; i < events.length; i++)
  {
    if(events[i].persons >= 10 && events[i].persons < 20)
    {
      events[i].price -= events[i].price * 0.1;
    }
    else if(events[i].persons >= 20 && events[i].persons < 60)
    {
      events[i].price -= events[i].price * 0.3;
    }
    else if(events[i].persons >= 60)
    {
      events[i].price -= events[i].price * 0.5;
    }
  }
}

//Step3
function setCommision()
{
    for(var i = 0; i < events.length; i++)
    {
       var commission = events[i].price * 0.3;
       events[i].commission.insurance = commission * 0.5;
       commission = commission * 0.5;
       events[i].commission.treasury = events[i].persons;
       events[i].commission.privateaser = commission - events[i].commission.treasury;
    }
}

//Step4
function setDeductible()
{
  for(var i = 0; i < events.length; i++)
  {
    if(events[i].options.deductibleReduction == true)
    {
      events[i].price += events[i].persons;
    }
  }
}

//Step5
function getEvent(id)
{
  for(var i = 0; i < events.length; i++)
  {
    if(id == events[i].id) return events[i];
  }
  return null;
}

function pay()
{
  for(var i = 0; i < actors.length; i++)
  {
    var obj = getEvent(actors[i].eventId);
    for(var j = 0; j < actors.payment.length; j++)
    {
        if(actors.payment[i].localCompare("booker")==0)actors.payment[i].amount=obj.price;
        if(actors.payment[i].localCompare("bar")==0)actors.payment[i].amount= obj.price * 0.7;
        if(actors.payment[i].localCompare("insurance")==0)actors.payment[i].amount = obj.commission.insurance;
        if(actors.payment[i].localCompare("treasury")==0)actors.payment[i].amount = obj.commission.treasury;
        if(actors.payment[i].localCompare("privateaser")==0)actors.payment[i].amount = obj.commission.privateaser;
    }
  }
}


console.log(bars);
setPrice();
decreasing();
setCommision();
setDeductible();
console.log(events);
console.log(actors);
