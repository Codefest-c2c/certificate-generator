const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');


admin.initializeApp();



// // SandGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");


const sendSendGridMail = async (snap) => {
    try {
        const docId = snap.id;
        const name = snap.name;
        const email = snap.email;
        const fname = name.split(' ')[0];
        const attachment = fs.readFileSync(snap.attachment).toString("base64");
        let info = await sgMail.send({
            from: "DevFest India Team <no-reply@devfestindia.com>",
            dynamicTemplateData: {
                name: fname
            },
            to: email,
            attachments: [{
                content: attachment,
                filename: "devfest-india-certificate.pdf",
                type: "application/pdf",
                disposition: "attachment"
            }],
            templateId: "d-91b9c952a657484c8a0312427a864569",
        }).then(res => {
            // console.log('Called');
        }).catch(e => {
            console.log(e);
        });
    } catch (e) {
        console.log(e);
    }
}


exports.markAttendence = functions.firestore.document('feedback/{id}').onCreate(async (snap, context) => {
    const email = snap.data().email;
    let user = await admin.firestore().collection("edata").where("email", "==", email).limit(1).get();
    const uids = user.docs.map((doc) => doc.id);
    if (uids.length > 0) {
        admin.firestore().collection('edata').doc(uids[0]).update({
            attendence: true,
        }).then(res => {
            // console.log(res);
        }).catch(e => {
            console.log(e);
        });
    }
});

// exports.sendCertificate = functions.https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Origin', '*'); // *=>all, or http://adasdas.asdasd
//     res.set('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type,Accept, Authorization");
//     res.set('Access-Control-Allow-Methods', 'POST');
//     if (req.method == 'OPTIONS') {
//         res.status(204).send('');
//     } else if (req.method !== 'POST') {
//         return res.status(405).end();
//     }
//     const busboy = new Busboy({
//         headers: req.headers
//     });
//     const fields = {};
//     const uploads = {};
//     const fileWrites = [];
//     const tmpdir = os.tmpdir();
//     busboy.on('field', (fieldname, val) => {
//         fields[fieldname] = val;
//     });
//     busboy.on('file', (fieldname, file, filename) => {
//         const filepath = path.join(tmpdir, filename);
//         uploads[fieldname] = filepath;
//         const writeStream = fs.createWriteStream(filepath);
//         file.pipe(writeStream);

//         const promise = new Promise((resolve, reject) => {
//             file.on('end', () => {
//                 writeStream.end();
//             });
//             writeStream.on('finish', resolve);
//             writeStream.on('error', reject);
//         });
//         fileWrites.push(promise);
//     });
//     busboy.on('finish', async () => {
//         await Promise.all(fileWrites);
//         await sendSendGridMail({
//             ...fields,
//             attachment: uploads.certificate
//         });
//         for (const file in uploads) {
//             fs.unlinkSync(uploads[file]);
//         }
//         return res.status(200).json({
//             success: true
//         });
//     });
//     busboy.end(req.rawBody);
// });
