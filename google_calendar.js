const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {

   try {
         let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
             resource: event
       });
    
       if (response['status'] == 200 && response['statusText'] === 'OK') {
             return 1;
         } else {
             return 0;
         }
     } catch (error) {
         console.log(`Error at insertEvent --> ${error}`);
         return 0;
     }
 };

let dateTime = dateTimeForCalander();

//Event for Google Calendar
 let event = {
    'summary': `XYZ Class.`,
    'description': `ABC Topic.`,
     'start': {
         'dateTime': dateTime['start'],
       'timeZone': 'Asia/Kolkata'
     },
     'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
     }
 };

insertEvent(event)
     .then((res) => {
        console.log(res);
     })
    .catch((err) => {
        console.log(err);
     });

// Get all the events between two dates
// const getEvents = async (dateTimeStart, dateTimeEnd) => {

//     try {
//         let response = await calendar.events.list({
//             auth: auth,
//             calendarId: calendarId,
//             timeMin: dateTimeStart,
//             timeMax: dateTimeEnd,
//             timeZone: 'Asia/Kolkata'
//         });
    
//         let items = response['data']['items'];
//         return items;
//     } catch (error) {
//         console.log(`Error at getEvents --> ${error}`);
//         return 0;
//     }
// };

//  let start = '2021-09-17T00:00:00.000Z';
//  let end = '2021-09-18T00:00:00.000Z';

//  getEvents(start, end)
//      .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
// const deleteEvent = async (eventId) => {

//     try {
//         let response = await calendar.events.delete({
//             auth: auth,
//             calendarId: calendarId,
//             eventId: eventId
//         });

//         if (response.data === '') {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at deleteEvent --> ${error}`);
//         return 0;
//     }
// };

// let eventId = '84o0ress9so1rmh8nfdga1nu24';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//      });




     //Update the event
//      let eventId= "579obo1568ckne8cdtj162ctjs";


// const updateEvent = async (event) => {

//         try {
//             let response = await calendar.events.update({
//                 auth: auth,
//                 calendarId: calendarId,
//                 eventId: eventId,
//                 resource: event

//             });
        
//             if (response['status'] == 200 ){
//                 console.log("updated");
//                 return 1;
//             } else {
//                 return 0;
//             }
//         } catch (error) {
//             console.log(`Error at insertEvent --> ${error}`);
//             return 0;
//         }
//     };
//     // let dateTime = dateTimeForCalander();
    
//     // Event for Google Calendar
//      let event = {
//          'summary': `Updated`,
//          'description': `changing`,
//        'start': {        'dateTime': '2021-09-17T15:26:00+05:30',
//            'timeZone': 'Asia/Kolkata'
//         },
//         'end': {
//             'dateTime': '2021-09-17T16:26:00+05:30',
//             'timeZone': 'Asia/Kolkata'
//         },
//         "colorId": "2",
//        "eventId" : "579obo1568ckne8cdtj162ctjs"
//     };
//    // let eventId= 'gdvuva2jthg164gdafohruq0fg'
    


//     updateEvent(event, eventId)
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         });