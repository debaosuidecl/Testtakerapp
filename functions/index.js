const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const scoreStaff = (staffAnswers, staffUid, Name, Surname, Designation)=>{
    let total= 0; let correctAnswers; let percentage
    return admin
    .firestore()
    .collection('correct-answers')
    .get()
    .then(snapshot=> {
        snapshot.docs.forEach(doc=> {
           correctAnswers = doc.data();
        })
    

        for(let correct in correctAnswers){
            for( let sAnswer in staffAnswers){
                let inCorrect =  Object.assign({}, correctAnswers[correct])
                let inStaff =  Object.assign({}, staffAnswers[sAnswer])
                let newCorrectObj = {
                    [correct]: inCorrect
                }
                let newStaffObj = {
                    [sAnswer]: inStaff
                  }
                  if(correct===sAnswer && newCorrectObj[correct].selectedOption === newStaffObj[sAnswer].selectedOption){
                      total++
                  }
                  percentage = total/8 *100

            }
        }

        console.log(`${percentage}%`, 'The score')
        admin.firestore().collection('staff-scores').doc(staffUid).set({
            score: percentage, Name, Surname, Designation, timeSubmitted: new Date().getTime()
        })
    })
}

exports.answerSubmitted = functions.firestore
.document('answers/{answer}')
.onCreate(doc=> {
    const  staffAnswer = doc.data()
    const Name = doc.data().Name
    const Surname= doc.data().Surname
    const Designation= doc.data().Designation;
    const staffUid = doc.id
    return scoreStaff(staffAnswer, staffUid, Name, Surname, Designation)
})