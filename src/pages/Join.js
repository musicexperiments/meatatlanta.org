import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react';
import meat from '../log2.png'

import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

const checkConnection = async () => {
   // Get Firestore database instance

  try {
    // Try to read a collection (assuming "your_collection_name" exists in your Firestore)
    const querySnapshot = await getDocs(collection(db, "signup"));
    
    if (!querySnapshot.empty) {
      console.log("Connected to Firestore! Data found:");
      
    } else {
      console.log("Connected to Firestore, but no data found.");
    }
    
    console.log("Nice! Connection is working.");
  } catch (error) {
    console.error("Error connecting to Firestore: ", error);
  }
};




function playSound(stepDict, id) {

  var row = id[0]
  var index = parseInt(id.substring(1))
  

  if(stepDict[row].nodes[index] === true)
  {
    //console.log("here!")
    new Audio(stepDict[row].sound).play()
    //console.log(new Audio(stepDict[row].sound).play())
  }
  


}

function Join() {

  const genre = Math.floor(Math.random() * 4) + 1

  const [stepDict, setStepDict] = useState({
    'A': {
      row: 'A',
      color: 'red',
      sound: `./media/sounds/${genre}/1.mp3`,
      nodes: [false, false, false, false]
    },
    'B': {
      row: 'B',
      color: 'red',
      sound: `./media/sounds/${genre}/2.mp3`,
      nodes: [false, false, false, false]
    },
    'C': {
      row: 'C',
      color: 'red',
      sound: `./media/sounds/${genre}/3.mp3`,
      nodes: [false, false, false, false]
    },
    'D': {
      row: 'D',
      color: 'red',
      sound: `./media/sounds/${genre}/4.mp3`,
      nodes: [false, false, false, false]
    },
    

  })

  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("new message!!!")
  const [dynamicHeight, setDynamicHeight] = useState("0px")
  const [pch, setPch] = useState("100vh");
  const [pcw, setPcw] = useState('50%');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState('');
  const [msg, setMsg] = useState('enter phone # to join M.E.A.T.')
  const [firstTime, setFirstTime] = useState(true)


  
  

 

  //reset timer function
  useEffect(() => {

  
      if(count !== 4) {
        
        // Array of letters to iterate over
        const letters = ['A', 'B', 'C', 'D'];

        

        // Iterate through each letter
        letters.forEach(letter => {
          //document.getElementById(letter + count).style.visibility = 'visible';

          //console.log(document.getElementById(letter + count).style.display)
                
          


          //sort of what you want. fix visibilty thing.

          switch(count)
          {
            case 0:
              //console.log("case 0")
              document.getElementById(letter + count).style.boxShadow = 'inset 0 0 0 3px rgba(255, 255, 255, 0.9)';
              document.getElementById(letter + 1).style.boxShadow = 'none';
              document.getElementById(letter + 2).style.boxShadow = 'none';
              document.getElementById(letter + 3).style.boxShadow = 'none';
              break;
            case 1:
              //console.log("case 1")
              document.getElementById(letter + count).style.boxShadow = 'inset 0 0 0 3px rgba(255, 255, 255, 0.9)';
              document.getElementById(letter + 0).style.boxShadow = 'none';
              document.getElementById(letter + 2).style.boxShadow = 'none';
              document.getElementById(letter + 3).style.boxShadow = 'none';
              break;
            case 2:
              //console.log("case 2")
              document.getElementById(letter + count).style.boxShadow = 'inset 0 0 0 3px rgba(255, 255, 255, 0.9)';
              document.getElementById(letter + 0).style.boxShadow = 'none';
              document.getElementById(letter + 1).style.boxShadow = 'none';
              document.getElementById(letter + 3).style.boxShadow = 'none';
              break;
            case 3:
              //console.log("case 3")
              document.getElementById(letter + count).style.boxShadow = 'inset 0 0 0 3px rgba(255, 255, 255, 0.9)';
              document.getElementById(letter + 0).style.boxShadow = 'none';
              document.getElementById(letter + 1).style.boxShadow = 'none';
              document.getElementById(letter + 2).style.boxShadow = 'none';
              break;



          }
            if (stepDict[letter] && stepDict[letter].nodes[count] === true) {
                // Play the sound for the corresponding letter
                playSound(stepDict, letter + count);

                // If it's the 'A' case, hide the element

                  document.getElementById(letter + count).style.opacity = '100%';
              
            }

            
        });
        
      
        
    }
    else {
      setCount(0);
    }
  
   
  }, [count])


  //timer function
  useEffect(() => {

    
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
      
      
    }, Math.floor(Math.random() * 7) * 100 + 400); // 1000 milliseconds = 1 second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array ensures the effect runs only once on mount

  
  function updateNodeInStepDict(row, index) {
    setStepDict((prevStepDict) => {
      // Create a new copy of the row object to ensure immutability
      const newRow = { ...prevStepDict[row] };
  
      // Toggle the value of the node (false <-> true)
      newRow.nodes = [...newRow.nodes];  // Ensure we don't mutate the old array directly
      newRow.nodes[index] = !newRow.nodes[index];  // Toggle the node
  
      // Return a new stepDict object with the updated row
      return {
        ...prevStepDict,
        [row]: newRow,  // Replace the row with the updated version
      };
    });
  }

  function turnOn(id) {
    var row = id[0]
    var index = parseInt(id.substring(1))

    

    //console.log(index)
    //console.log(row)
    // console.log(window.getComputedStyle(document.getElementById(id)).opacity)
    

    //console.log()
    
   //console.log(window.getComputedStyle(document.getElementById(id)).backgroundColor)
    //document.getElementById(id).style.backgroundColor = '#61dafb';

    const element = document.querySelector('#grid'); // Or another method of selecting the element
      if (element) {
        if(window.getComputedStyle(document.getElementById(id)).backgroundColor === "rgba(97, 218, 251, 0.5)")
          {
           document.getElementById(id).style.backgroundColor = '#61dafb';
           
            //document.getElementById(id).style.opacity = '1';
           // console.log(stepDict[row])
            updateNodeInStepDict(row, index)
            //console.log(stepDict[row].nodes)
          }
          else
          {
           document.getElementById(id).style.backgroundColor = 'rgba(97, 218, 251, 0.5)';
            updateNodeInStepDict(row, index)
     
          }
      } else {
          //console.log("Element not found");
      }
   var cast = parseFloat(window.getComputedStyle(document.getElementById(id)).opacity)
   
   
     //new Audio(stepDict['A0'].sound).play()*/
   
   }



   useEffect(() => {
    // Set up the interval to call `myFunction` every 100ms
    const intervalId2 = setInterval(() => {

      const element = document.querySelector('#grid'); // Or another method of selecting the element
      if (element) {
        setDynamicHeight(window.getComputedStyle(document.getElementById("grid")).width)

      } else {
          //console.log("Element not found");
      }

    }, 100); // 100ms interval

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId2);
  }, []); // Empty dependency array ensures this runs only once on mount


  
  const addDocument = async (phoneNum) => {
    try {
      // Prepare the document data
      const docData = {
        phone: phoneNum, // You can add a timestamp or other fields as needed
      };

      // Add the document to the "signup" collection
      const docRef = await addDoc(collection(db, "signup"), docData);

      // Log success and document ID
      //console.log("Document added with ID: ", docRef.id); 
      setSubmitted(true);
      setSuccess(true);
      setPhone('')
      setMsg('Welcome to M.E.A.T.')
      await delay(10000);
      setMsg('enter your phone # to join M.E.A.T.')
      setSubmitted(false)

    } catch (error) {
      setSubmitted(true);
      setSuccess(false);
      console.error("Error adding document: ", error);
    }
  };

    
  return (
    <div className='parent'>
     
     <div className='test'>
    <div className="App" id="parentContainer">
    <img src={meat} className='meat'></img>

    <br></br>
          <button className='message' onClick={(e) => {
            setFirstTime(false)
            setShowMessage(!showMessage);
            if(showMessage) {setMessage("new message!!!")}
            else {setMessage("close message")}
            }}>

       <b></b> {message}

      

          </button>
          <br></br>

    <div className='popStyle' style={{height: dynamicHeight}}>
      <header className="App-header" id="grid" style={{height: dynamicHeight, opacity: showMessage ? 0 : 1}}>


        <button onClick={(e) => {turnOn(e.target.id)}} id="A0"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="A1"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="A2"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="A3"></button>

        <button onClick={(e) => {turnOn(e.target.id)}} id="B0"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="B1"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="B2"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="B3"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="C0"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="C1"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="C2"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="C3"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="D0"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="D1"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="D2"></button>
        <button onClick={(e) => {turnOn(e.target.id)}} id="D3"></button>






      </header>
      

      

     <div className='showMsg' style={{height: dynamicHeight, display: showMessage ? 'block' : 'none'}}>
        <p>Join us for our first M.E.A.T. Up!</p>
     <p >Thursday January 23rd at 4PM </p>

     <p style={{fontStyle: 'italic'}}><span style={{fontWeight: 'bold'}}>Lab for Interaction & Immersion</span></p>

   
      
     <p> <a target='_blank' href='https://maps.app.goo.gl/Wdp3X2Wvce8QmV5H8'>
      204 Couch Bldg (Music)<br></br>
840 McMillan St NW<br></br>
Atlanta, GA 30332</a></p>
<p> Room #204 (L42i)</p>

<p style={{fontStyle: 'italic'}}><span style={{fontWeight: 'bold'}}>OPEN TO ALL</span></p>

</div>
</div>
      
          
      <br></br>

      <button className='learnMore' onClick={() => {
        
        window.open("https://www.instagram.com/meatatlanta/", "_blank")
      }}>Learn More</button>
    
      {/*<input type="tel" value={phone} onChange={(e) => {
        setPhone(e.target.value)
        

      }} placeholder={msg}/>
      <br></br>*/}
      <button type="submit" className='submit' onClick={() => {

        window.open("https://groupme.com/join_group/105400885/VeHq1Apk", "_blank");
       /* if(phone !== "")
        {
addDocument(phone)
        }
        */
        }}>
        {/*submitted ? success ? 'thank you!' : 'something went wrong' : 'submit'*/}
        <b>join M.E.A.T.</b>
     
        </button>
    </div>
    </div>
    </div>
  );
}

export default Join;
