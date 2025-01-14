function anagram(first, second) {

    if (!first || !second) {
        console.log("Both strings must be provided.");
        return;
    }

    let array1 = first.split("").sort().join("");  
    let array2 = second.split("").sort().join(""); 


    if (array1 === array2) {
        console.log(`${first} is an anagram of ${second}`);
    } else {
        console.log(`${first} is not an anagram of ${second}`);
    }
}
anagram("cat", "tac");  // cat is anagram of tac
anagram("cat", "tacit");// cat is not anagram of tacit