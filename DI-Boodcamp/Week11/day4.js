//ex1
function compareToTen(num) {
    return new Promise((resolve, reject) => {
      if (num <= 10) {
        resolve(`${num} is less than or equal to 10.`);
      } else {
        reject(`${num} is greater than 10.`);
      }
    });
  }

  compareToTen(5)
  .then(result => console.log(result))  
  .catch(error => console.log(error));  

compareToTen(15)
  .then(result => console.log(result))  
  .catch(error => console.log(error));  


  //ex2
  function letsuccess() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = true;

          if (success) {
            resolve("success");  
          } else {
            reject("error");  
          }
        }, 4000); 
      });
    }

letsuccess()
    .then(result => {
        console.log(result);  
      })
      .catch(error => {
        console.log(error);  
      })

 //ex3
 Promise.resolve(3)
 .then(result => {
   console.log(result);  
 })
 .catch(error => {
   console.log(error);  
 });


Promise.reject("Boo!")
 .then(result => {
   console.log(result);  
 })
 .catch(error => {
   console.log(error);  
 });

 //Daily challenge1

 const harryPotter = ['ron', 'dobbi', 'draco', 'hagrid'];

function makeAllCaps(array) {
  return new Promise((resolve, reject) => {
    if (array.every(element => typeof element === 'string')) {
      resolve(array.map(word => word.toUpperCase()));  
    } else {
      reject('Not all elements are strings');  
    }
  });
}

makeAllCaps(harryPotter)
  .then(result => console.log(result))  
  .catch(error => console.log(error));


  const xMans = ['Iceman', 'Beast', 'Archangel', 'Cyclops', 'Professor X'];
  const capitalXMans = xMans.map(word => word.toUpperCase());
  
  function sortWords(array) {
      return new Promise((resolve, reject) => {
          if (array.length > 4) { // 
              const sortedXmens = array.sort();  
              resolve(sortedXmens);  
          } else {
              reject('Length is less than 4');  
          }
      });
  }
  
  sortWords(capitalXMans)
    .then(result => console.log(result))  
    .catch(error => console.log(error));

     //Daily challenge2

     const morse = `{
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "a": ".-",
        "b": "-...",
        "c": "-.-.",
        "d": "-..",
        "e": ".",
        "f": "..-.",
        "g": "--.",
        "h": "....",
        "i": "..",
        "j": ".---",
        "k": "-.-",
        "l": ".-..",
        "m": "--",
        "n": "-.",
        "o": "---",
        "p": ".--.",
        "q": "--.-",
        "r": ".-.",
        "s": "...",
        "t": "-",
        "u": "..-",
        "v": "...-",
        "w": ".--",
        "x": "-..-",
        "y": "-.--",
        "z": "--..",
        ".": ".-.-.-",
        ",": "--..--",
        "?": "..--..",
        "!": "-.-.--",
        "-": "-....-",
        "/": "-..-.",
        "@": ".--.-.",
        "(": "-.--.",
        ")": "-.--.-"
      }`

      function toJs() {
        return new Promise((resolve, reject) => {
          const morseStr = `{
            "0": "-----",
            "1": ".----",
            "2": "..---",
            "3": "...--",
            "4": "....-",
            "5": ".....",
            "6": "-....",
            "7": "--...",
            "8": "---..",
            "9": "----.",
            "a": ".-",
            "b": "-...",
            "c": "-.-.",
            "d": "-..",
            "e": ".",
            "f": "..-.",
            "g": "--.",
            "h": "....",
            "i": "..",
            "j": ".---",
            "k": "-.-",
            "l": ".-..",
            "m": "--",
            "n": "-.",
            "o": "---",
            "p": ".--.",
            "q": "--.-",
            "r": ".-.",
            "s": "...",
            "t": "-",
            "u": "..-",
            "v": "...-",
            "w": ".--",
            "x": "-..-",
            "y": "-.--",
            "z": "--..",
            ".": ".-.-.-",
            ",": "--..--",
            "?": "..--..",
            "!": "-.-.--",
            "-": "-....-",
            "/": "-..-.",
            "@": ".--.-.",
            "(": "-.--.",
            ")": "-.--.-"
          }`;
      
          try {
            const morseJS = JSON.parse(morseStr);  
            if (Object.keys(morseJS).length === 0) {  
              reject('Morse object is empty');
            } else {
              resolve(morseJS);  
            }
          } catch (error) {
            reject('Failed to parse Morse JSON');
          }
        });
      }

      function toMorse(morseJS) {
        return new Promise((resolve, reject) => {
          const userInput = prompt("Please enter a word or sentence:");  
      
        
          const morseTranslation = [];
          for (let char of userInput.toLowerCase()) {
            if (morseJS[char]) {
              morseTranslation.push(morseJS[char]); 
            } else {
              reject(`Character "${char}" not found in Morse code dictionary`);  
              return;
            }
          }
      
          resolve(morseTranslation);  
        });
      }
    
      function joinWords(morseTranslation) {
        const morseString = morseTranslation.join("\n");  
        const pre = document.createElement("pre");  
        pre.textContent = morseString;  
        document.body.appendChild(pre);  
      }

      toJs()  
  .then(morseJS => {
    return toMorse(morseJS);  
  })
  .then(morseTranslation => {
    joinWords(morseTranslation);  
  })
  .catch(error => {
    console.log(error);  
  });