
//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDo8jilTTNDFBjCDq0Kufu3HMcHdzhyMnk",
  authDomain: "bhagavad-gita-c4dbb.firebaseapp.com",
  databaseURL: "https://bhagavad-gita-c4dbb-default-rtdb.firebaseio.com",
  projectId: "bhagavad-gita-c4dbb",
  storageBucket: "bhagavad-gita-c4dbb.firebasestorage.app",
  messagingSenderId: "920805007847",
  appId: "1:920805007847:web:ebc4d72f556844d06a5d42",
  measurementId: "G-K30FLZR7WW"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
async function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Translations/${languageKey}`
  );
  const meaningRef1 = ref(database, `Shloka-${shlokaNum}/Meaning/${languageKey}`);
  const snapshot3 =await get(meaningRef1);
  if (snapshot3.exists()) {
    const meaningText1 = snapshot3.val();
    document.getElementById("meaning-box").innerHTML =`${meaningText1}`;
  } else {
    console.error("No text data found.");
  }
  const wordtowordRef1 = ref(database,`Shloka-${shlokaNum}/Wordtoword/${languageKey}`);
  const snapshot6 =await get(wordtowordRef1);
  if (snapshot6.exists()) {
    const wordtowordText1 = snapshot6.val();
    document.getElementById("wordtoword-box").innerHTML =`${wordtowordText1}`;
  } else {
    console.error("No text data found.");
  }
  const audioRef1 = ref(database,`Shloka-${shlokaNum}/audmf/${languageKey}`);
  const snapshot7 =await get(audioRef1);
  if (snapshot7.exists()) {
    const audioUrl2 = snapshot7.val();
    document.getElementById("audPlayer2").src = audioUrl2;
  } else {
    console.error("No text data found.");
  }
  const audioRef2 = ref(database,`Shloka-${shlokaNum}/audmm/${languageKey}`);
  const snapshot8 =await get(audioRef2);
  if (snapshot8.exists()) {
    const audioUrl3 = snapshot8.val();
    document.getElementById("audPlayer3").src = audioUrl3;
  } else {
    console.error("No text data found.");
  }
  const audioRef3 = ref(database,`Shloka-${shlokaNum}/audwf/${languageKey}`);
  const snapshot9 =await get(audioRef3);
  if (snapshot9.exists()) {
    const audioUrl4 = snapshot9.val();
    document.getElementById("audPlayer4").src = audioUrl4;
  } else {
    console.error("No text data found.");
  }
  const audioRef4 = ref(database,`Shloka-${shlokaNum}/audwm/${languageKey}`);
  const snapshot10 =await get(audioRef4);
  if (snapshot10.exists()) {
    const audioUrl5 = snapshot10.val();
    document.getElementById("audPlayer5").src = audioUrl5;
  } else {
    console.error("No text data found.");
  }
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}

//----------------------/Database Integration End/-----------------------

window.changeText = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};
window.translateWordtoword = function (languageKey) {
  fetchWordtoword(window.currentShlokaNum, languageKey);
};

//-----------------------------/Onclick functions/-----------------------------
window.navClick = async function (shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);  
  const meaningRef = ref(database, `Shloka-${shlokaNumber}/meaning/2`);
  const audioRef = ref(database, `Shloka-${shlokaNumber}/aud`);
  const audio1Ref = ref(database, `Shloka-${shlokaNumber}/audm`);
  const wordtowordRef = ref(database, `Shloka-${shlokaNumber}/wordtoword`);
  const imageRef = ref(database, `Shloka-${shlokaNumber}/image`);

  const snapshot = await get(audioRef);
  const snapshot1 = await get(mainRef);  
  const snapshot2 = await get(meaningRef);
  const snapshot5 = await get(audio1Ref);
  const snapshot4 = await get(wordtowordRef);
  const snapshot11 = await get(imageRef);

  if (snapshot2.exists()) {
    const meaningText = snapshot2.val();
    document.getElementById("meaning-box").innerHTML =`Meaning:${meaningText}`;
  } else {
    console.error("No text data found.");
  }
  if (snapshot5.exists()) {
    const audioUrl = snapshot5.val();
    document.getElementById("audPlayer1").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot4.exists()) {
    const wordtowordText = snapshot4.val();
    document.getElementById("wordtoword-box").innerHTML = wordtowordText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot11.exists()) {
    const imageUrl = snapshot11.val(); // Retrieve the image URL
    document.getElementById("imgViewer").src = imageUrl; // Set the image URL as the src of the img element
} else {
    console.error("No image data found.");
}
};
