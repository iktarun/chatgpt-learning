var input = "";
var queryResult = document.querySelector(".query-result");
var textarea = document.querySelector("textarea");
var button = document.querySelector("button");

textarea.addEventListener("input", updateValue);
function updateValue(e) {
  input = e.target.value;
}

button.addEventListener("click", getDataFromAPI);
function parseDataAndAddElement(input, data) {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.className = "row";
  data = data.replace(/(?:\r\n|\r|\n)/g, "<br>");
  // and give it some content
  newDiv.innerHTML = data;
  // add the newly created element and its content into the DOM
  queryResult.append(newDiv);
  // Scroll to the bottm on div, as new content has been added
  queryResult.scrollTop = queryResult.scrollHeight;
}

function getDataFromAPI() {
  fetch("http://localhost:3001/get-data?input=" + input)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      parseDataAndAddElement(input, data.data);
    });
}
