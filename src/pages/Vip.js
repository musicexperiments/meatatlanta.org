import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect, useRef } from 'react';
import meat from '../log2.png'
import backgroundMusic from '../music/vipAmbiance.mp3'; // Import your audio file


import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import TextOnImage from './smaller/TextOnImage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));








function Vip() {

    const [entPassword, setEntPass] = useState("")
    const [correct, setCorrect] = useState(false)
    const [readyToGen, setReadyToGen] = useState(false)
    const [name, setName] = useState("")
    const [num, setNum] = useState(null)

    const audioRef = useRef(new Audio(backgroundMusic)); // Create audio element
  const [audioReady, setAudioReady] = useState(false);

  function handleAlertAndPlay () {
 
    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch((error) => console.error('Error playing audio:', error)); // Play audio and catch errors
    
  };


    const checkConnection = async () => {
        // Get Firestore database instance
     
       try {
         // Try to read a collection (assuming "your_collection_name" exists in your Firestore)
         const querySnapshot = await getDocs(collection(db, "vip_valentines"));
         
         if (!querySnapshot.empty) {
           console.log("Connected to Firestore! Data found:");
           setNum(querySnapshot.size + 1)
           
         } else {
           console.log("Connected to Firestore, but no data found.");
           setNum(1)
         }
         
         console.log("Nice! Connection is working.");
       } catch (error) {
         console.error("Error connecting to Firestore: ", error);
       }
     };


     const addNewDoc = async (name, index) => {
        try {
          // Add a new document to the "signup" collection
          const docRef = await addDoc(collection(db, "vip_valentines"), {
            name: name,       // The field "name" will store the user's name
            index: index,
            timestamp: new Date()  // You could add a timestamp to record when the doc was created
          });
          console.log("Document added with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
      

    useEffect(()=> {
        checkConnection();
    }, [])
    

  
    
  return (
    <div className='parent'>
     
        <div className='test'>
            {!correct && <div className="App" id="parentContainer">
                <img src={meat} className='meat'></img>
                <br></br>

                <div className='vipmsg'>
        <p style={{fontWeight: 'bold'}}>VERY IMPORTANT PERSON <br></br><br></br>M.E.A.T. VALENTINE'S: AN 8D AUDIO-VISUAL EXPERIENCE</p>
     <p >Friday February 7th at 9:17PM </p>

     <p> <a target='_blank' href='https://maps.app.goo.gl/5dvCRrUXynafHMyi7'>
      Factor's<br></br>
453 Moreland Ave NE<br></br>
</a></p>
<p>You are invited as a V.I.P. to this event. <br></br><br></br>Please fill out this form to receive your ticket.</p>





</div>
<br></br>
<div className="vipmsg3">
                please turn your phone volume up
                
                </div>
<br></br>
                 <input type="text" onChange={(e) => {setEntPass(e.target.value)}} onKeyDown={(e) => {

                  
                    if(e.key === "Enter")
                    {
                        if(entPassword.toLowerCase() === "igotmeat")
                            {
                                handleAlertAndPlay()
                                setCorrect(true)
                            }
                        
                    }
                }}  placeholder="password"/>
                <br></br>
                <button type="submit" className='submit' onClick={() => {
                    if(entPassword.toLowerCase() === "igotmeat")
                    {
                       handleAlertAndPlay()
                        setCorrect(true)
                    }

                    }}>
                    <b>submit</b>
                </button>

            </div>}

            {correct && !readyToGen && <div className="App" id="parentContainer">
    
                <img src={meat} className='meat'></img>
                <br></br>
                <input type="text" onChange={(e) => {setName(e.target.value)}} onKeyDown={(e) => {
                    if(e.key === "Enter")
                    {
                       setReadyToGen(true)
                       addNewDoc(name, num)

                      

                    }
                }}  placeholder="welcome in, enter your name"/>
                <br></br>
                <button type="submit" className='submit' onClick={() => {
                    setReadyToGen(true)
                    addNewDoc(name, num)
            

                    }}>
                    <b>next</b>
                </button>
      

            </div>}

            {correct && readyToGen && <div className="App" id="parentContainer">
    
    <img src={meat} className='meat'></img>
    <TextOnImage text={name} number={num}/>
   


</div>}

        </div>
        <br></br>
    </div>
  );
}

export default Vip;
