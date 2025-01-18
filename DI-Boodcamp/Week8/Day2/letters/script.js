const input = document.getElementById('myInput');

input.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!/[a-zA-Z]/.test(key)) {
    event.preventDefault(); 
  }
});