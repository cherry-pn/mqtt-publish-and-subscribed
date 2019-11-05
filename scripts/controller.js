// basic functionalities
var topicInput = $("#topic")//document.getElementById("topic");
var payloadInput = $("#payload")//document.getElementById("payload");
var btnPub = $("#btn_publish")//document.getElementById("btn_publish");
var btnSub = $("#btn_subscribe")//document.getElementById("btn_publish");
var btnUSub = $("#btn_unsubscribe")//document.getElementById("btn_publish");
var messages = $("#message")//document.getElementById("message");
var sub = $("#subscribe")//document.getElementById("message");
var usub = $("#unsubscribe")//document.getElementById("message");
var client;
var dt = new Date();

 
// opening/ requesting connection to the broker/server

// publish button  click function --publish topic && payload
btnPub.on("click", function () {
  client.publish(topicInput.val(), payloadInput.val())
})
 
// subscribe button  click function --subscribe topic
btnSub.on("click", function () {
  client.subscribe(sub.val())
})
// unsubscribe button  click function --unsubscribe topic
btnUSub.on("click", function () {
  client.unsubscribe(usub.val())
 
})
// end button  click function -- disconnect client
$("#dis").click(function () {
  client.end();
  $('#status').text("DISCONNECTED");
})
$('#connect').click(function(){
  client = mqtt.connect($('#address').val())
  $('#status').text("CONNECTED");
 
  // when officially connected to the broker
  client.on("connect", function () {
    client.on("message", function (topic, payload) {
      addrow(topic, payload)
    })
    console.log("Successfully connected");
  })
})
 
 
// $("#cnct").click(function () {
//   client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// })
 
// when received message from the broker/server by the topics subscribed(messages form the topic you subscribe)

// add row to the table
function addrow(topic, payload) {
  var row = ($("<tr>")) //creating a tr element
  $('tbody').append( //addint <tr> to <tbody>
    $(row).append(//adding 2 <td>  to <tr>  before adding to <tbody>
      $("<td>").text(topic),
      $("<td>").text(payload),
      $("<td>").text(dt.toUTCString()  ))
  )
}
 
