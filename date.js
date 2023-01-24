exports = getDate;       //if we have multiple functions to export then -> module.exports.getDate = getDate;
                                //                            another function -> module.exports.anotherFunction = anotherFunction; 



//module.exports.getDate = function() {
var getDate = function() {    
const today = new Date();

const options = {
 weekday: "long",
 day: "numeric",
 month: "long"
}

return today.toLocaleDateString("hi-IN", options );


/* var day = "";

 switch(today.getDay()){

 case "0": {
     day = "Sunday";
 }
 case "1": {
     day = "Monday";
 }
 case "2": {
     day = "Tuesday";
 }
 case "3": {
     day = "Wednesday";
 }
 case "4": {
     day = "Thursday";
 }
 case "5": {
     day = "Friday";
 }
 case "0": {
     day = "Satday";
 }
 default:{
     console.log("Error:" + today.getDay());
 }
} */

/* if(today.getDay() ===  6 || today.getDay() === 0){
day = "weekend";
 //res.write("Its weekend");

} else {
 day = "weekday";
 //res.write("I have to work");

} */
}