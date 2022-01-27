const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

const [doc, collection, addDoc, getDocs, deleteDoc, setDoc, Timestamp] = [
  firestore.doc,
  firestore.collection,
  firestore.addDoc,
  firestore.getDocs,
  firestore.deleteDoc,
  firestore.setDoc,
  firestore.Timestamp,
];

const dotenv = require("dotenv");
const env = dotenv.config().parsed;

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "calendar-12e83.firebaseapp.com",
  projectId: "calendar-12e83",
  storageBucket: "calendar-12e83.appspot.com",
  messagingSenderId: "167246709510",
  appId: "1:167246709510:web:d16b4be9fa9da427655487",
};
console.log(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

const getTime = (dateTime) => {
  return Timestamp.fromDate(new Date(dateTime));
};

const updateEvent = async (id, event) => {
  try {
    await setDoc(doc(db, "events", id), event);
  } catch (error) {
    console.error("Error update document: ", error);
    throw error;
  }
};

const addNewEvent = async (event) => {
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error add document: ", error);
    throw error;
  }
};

const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    var docs = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      docs.push(data);
    });
    return docs;
  } catch (error) {
    console.error("Error get all document: ", error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(db, "events", id));
  } catch (error) {
    console.error("Error delete document: ", error);
    throw error;
  }
};

module.exports = {
  getTime,
  updateEvent,
  addNewEvent,
  deleteEvent,
  getAllEvents,
};
