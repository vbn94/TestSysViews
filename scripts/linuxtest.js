localStorage.setItem("eid", 1);
$(document).ready(function() {
  // Load exercise description
  $.get('http://www.uktc-edu.eu:5001/task/' + localStorage.getItem("eid"), function(response) {
    const data = JSON.parse(response['data']);
    const decodedBytes = Uint8Array.from(atob(data['task']), c => c.charCodeAt(0));
    const decoder = new TextDecoder("utf-8");
    const decodedText = decoder.decode(decodedBytes);
    $('#exerciseDescription').text(decodedText);
    $('#exerciseHeading').text(data['heading']);
    console.log(response)
  });

  // Submit button click event handler
  $('#submitBtn').click(function() {
    var code = $('#codeInput').val();
    document.getElementById("responseField").innerHTML = "";
    $.ajax({
      url: 'http://www.uktc-edu.eu:5002/test/' + localStorage.getItem("eid"),
      type: 'POST',
      data: JSON.stringify({ code: code }),
      contentType: 'application/json',
      success: function(response) {
        $('#responseField').text(response[1]);
        console.log(response);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});


function getEx(){
    const selectElement = document.getElementById('ex');

// Make an asynchronous request to fetch the options from the API
 fetch('http://www.uktc-edu.eu:5001/tasks')
.then(response => response.json())
.then(data => {
  // Iterate over the options and create <option> elements
  data.forEach(task => {
    if (task.language_id == "1") {
    const optionElement = document.createElement('option');
    const data = JSON.parse(task.data);
    optionElement.value = task.id;
    optionElement.textContent = data.heading;
    console.log("zagl: " + data.heading);
    // Append the option to the select element
    selectElement.appendChild(optionElement);
    }
  });
});
 }

 function changeEx(){
   var eid = document.getElementById("ex").value;
   document.getElementById("codeInput").value = "";
   document.getElementById("responseField").innerHTML = "";
   console.log(eid);
   localStorage.setItem("eid", eid);
    $.get('http://www.uktc-edu.eu:5001/task/' + eid, function(response) {
      const data = JSON.parse(response['data']);
      const decodedBytes = Uint8Array.from(atob(data['task']), c => c.charCodeAt(0));
      const decoder = new TextDecoder("utf-8");
      const decodedText = decoder.decode(decodedBytes);
      $('#exerciseDescription').text(decodedText);
      $('#exerciseHeading').text(data['heading']);
                  console.log(response)
    });

 }