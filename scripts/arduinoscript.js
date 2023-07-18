document.getElementById("codeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitCode();
});

function submitCode() {
    document.getElementById("response").innerHTML = "";
    var code = document.getElementById("code").value;
    var ex_id = 1;
    var encodedCode = btoa(unescape(encodeURIComponent(code)));
    var data = {
        code: encodedCode,
        timeout: 15
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://www.uktc-edu.eu:5004/arduino/code/" + ex_id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log("Response data: " +  response);
                displayResponse(response);
            } else {
                displayResponse({ status: "error", message: "Failed to submit the code." });
            }
        }
    };

    xhr.send(JSON.stringify(data));
    console.log("Request data: " + JSON.stringify(data));
}



function displayResponse(response) {
    var responseDiv = document.getElementById("response");
     responseDiv.innerHTML = "";

    if (response.status != "timeout") {
        var decodedCompilerMsg = atob(response.compilermsg);
        var compilerMsg = decodedCompilerMsg || "Compilation successful.";
        var statusCode = response.status;
        responseDiv.innerHTML = "Status: " + statusCode + "<br>Compiler Message: " + compilerMsg;
    } else if (response.status === "timeout") {
        responseDiv.innerHTML = "Status: Timeout occurred. The request took too long to process.";
    } else {
        responseDiv.innerHTML = "Error: " + response.message;
    }
}