const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


//getting the current date
var todayDate = new Date();

//getting previous day date
var previousDayDate = new Date();
previousDayDate.setDate(todayDate.getDate()-1);
var formattedPreviousDayDate = previousDayDate.toLocaleDateString('en-GB');


// //getting the date after 30 days
for(var i=0;i<29;i++){
    todayDate.setDate(todayDate.getDate()+1);
}

var formattedNextMonthDate = todayDate.toLocaleDateString('en-GB');



const newDate = {
    date: formattedNextMonthDate,
    availableTimes: ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM"],
    isAvailable: [true,true,true,true,true,true,true,true,true,true]
}




async function add_next_month_day() {
    const res = await db.collection('days').add(newDate).then(() => console.log('added'));
}

async function delete_previous_day_date() {
    const snapshot = await db.collection('days').where('date','==',formattedPreviousDayDate).get();
    if(!snapshot.empty){
        snapshot.forEach(doc => {
            db.collection('days').doc(doc.id).delete().then(() => console.log('deleted'));
        });
        
    }
}


add_next_month_day();
delete_previous_day_date();



