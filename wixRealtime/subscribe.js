// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixRealtime from 'wix-realtime';
import { publishMessage } from 'backend/realtime';
import wixData from 'wix-data';
import { currentMember } from 'wix-members';

// when you create a message payload it can include
// sender name and image, the message and time stamp
// the massage can be text or image.
// the sender of the message shows on the right
// The receiver shows on the left their response
// send live messages on the chat session

let username, userId
let messageLog = ""
let channel = { name: "", resourceId: "" }

$w.onReady(async function () {

    memberObj()
    getMasseursList()
})

//Get Current Member 
const memberObj = async () => {
    const member = await currentMember.getMember()
    userId = member.profile.nickname
    console.log(userId)
    return userId
}

// Get Active Masseurs List and populate list
const getMasseursList = async () => {

    const getActiveMasseurs = wixData.query("Masseurs").eq("active", true)

    try {
        const results = await getActiveMasseurs.find()
        const masseurs = results.items

        if (masseurs) {
            let objItems = masseurs
            let opts = $w("#toMessage").options;
            for (let i = 0; i < objItems.length; i++) {
                opts.push({ "label": objItems[i].displayName, "value": objItems[i].username })
            }
            $w('#toMessage').options = opts
            return masseurs
        } else {
            return "no records found"
        }
    } catch (error) {
        console.log(error)
    }
}

// channel = {
//         name: "Masseurs",
//         resourceId: resourceId
// }

const subscribeToChannel = async (channel) => {
    

    wixRealtime.subscribe(channel, messageHandler)

}

const unsubscribeToChannel = async (resourceId) => {
   

    wixRealtime.subscribe(channel, messageHandler)

}

const messageHandler = async (message, channel) => {
    let payload = message.payload;
    let channelName = channel.name;
    let resourceId = channel.resourceId;
    if (message.publisher) {
        let publisherId = message.publisher.id;
    }
    messageLog += payload.message + '\n';
    $w('#receivedMessages').value = messageLog
}

wixRealtime.onConnected( () => {
  // handle connection
  $w("#btnCloseDisconnectAlert").hide();
} );

wixRealtime.onDisconnected( () => {
  // handle connection
  $w("#btnCloseDisconnectAlert").show();
} );

wixRealtime.onError( (error) => {
  let code = error.errorCode;
  let message = error.message;
  console.log(`${code} ${message}`)
  if(error.channel) {
    let channelName = error.channel.name;
    let resourceId = error.channel.resourceId;
    console.log(`${channelName} ${resourceId}`)
  }
  
} );


$w('#btnSend').onClick(() => {
    if ($w('#message').value) {
        $w('#btnSend').disable();
        $w('#message').disable();
        const message = $w('#message').value
        console.log(username)
        const messageData = { username, userId, message }
        console.log(messageData)
        publishMessage(channel, messageData)

        $w('#message').value = undefined;
        $w('#message').enable();
        $w('#btnSend').enable();
    }

});

$w('#toMessage').onChange((event) => {
    const selection = event.target.value
    username = selection

    subscribeToChannel(selection)

});

///


const someChannel = {"name": "Masseurs"};
let subscriptionId1;
let subscriptionId2;


async function subscribeAsync(someChannel, messageHandler1) {
  try {
    const id = await wixRealtime.subscribe(someChannel, messageHandler1);
    subscriptionId1 = id;
    console.log("some channel id : "+ subscriptionId1)
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the async function
subscribeAsync(someChannel, messageHandler1);



// first subscription to a channel 
wixRealtime.subscribe(someChannel, messageHandler1)
  .then( (id) => {
    subscriptionId1 = id;
  }) ;

// second subscription to the same channel
wixRealtime.subscribe(someChannel, messageHandler2)
  .then( (id) => {
    subscriptionId2 = id;
  }) ;

// ...

wixRealtime.unsubscribe({"subscriptionId": subscriptionId1})
  .then( () => {
    // unsubscribed from first subscription to channel
  } );

// ...

function messageHandler1(message, channel){
  // handle channel messages
}

function messageHandler2(message, channel){
  // handle channel messages
}
