let result = document.createElement("p");

function clearTextarea(event) {
  event.preventDefault();
  document.getElementById("textarea").value = "";
  document.getElementById("textarea").focus();
  document.getElementById("label").removeChild(result);
}

document.getElementById("clear").onclick = clearTextarea;

function getSentiment(event){
  event.preventDefault();

  const textarea = document.querySelector('#textarea');

  let input = textarea.value;

  if (textarea.value.trim() === '') {
    // prevent form submission
    event.preventDefault(); 
    
    // show an error message
    alert('Please enter some text.'); 

  } else {

    fetch("/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input_text: input })
    })
    .then(response => response.json())
    .then(data => {
      result.textContent = "Sentiment: " + data.sentiment;
      document.getElementById("label").appendChild(result);
  
      // To clear the data, assign it to null:
      data = null;
    })
    .catch(error => console.error(error));
  }

}

document.getElementById('submitbtn').onclick = getSentiment