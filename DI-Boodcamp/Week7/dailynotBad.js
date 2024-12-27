let sentence = 'Assembler is not bad';

let wordNot = sentence.indexOf('not');
console.log(wordNot);


let wordBad = sentence.indexOf('bad');
console.log(wordBad);

if (wordBad > wordNot) {
    sentence = sentence.replace('not bad', 'good')
    console.log(sentence)
} else {
    console.log(sentence)
}

