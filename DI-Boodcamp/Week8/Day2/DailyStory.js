
    const form = document.querySelector('#libform');
    const nounInput = document.querySelector('#noun');
    const adjectiveInput = document.querySelector('#adjective');
    const personInput = document.querySelector('#person');
    const verbInput = document.querySelector('#verb');
    const placeInput = document.querySelector('#place');
    const storyOutput = document.querySelector('#story');

    form.addEventListener('submit', function(event) {
      event.preventDefault();  

      const noun = nounInput.value;
      const adjective = adjectiveInput.value;
      const person = personInput.value;
      const verb = verbInput.value;
      const place = placeInput.value;

     
      if (!noun || !adjective || !person || !verb || !place) {
        alert('Please fill in all fields!');
        return;  
      }

     
      const story = `Once upon a time, there was a ${adjective} ${noun} named ${person}. ${person} loved to ${verb} in the ${place}.`;

      storyOutput.textContent = story;
    });