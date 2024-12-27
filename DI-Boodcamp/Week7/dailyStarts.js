/* for (let i = 1; i <= 5; i++) {
    let stars = '*'.repeat(i);  
    console.log(stars); 
} */

    let level = 5;  

    for (let i = 1; i <= level; i++) {  
        let stars = '';  
        
        for (let p = 1; p <= i; p++) {
            stars += '*';  
        }
        
        console.log(stars); 
    }