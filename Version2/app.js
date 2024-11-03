function addRowTableProject(dataProject, counter) {
    document.getElementById("tableProjects").innerHTML += buildRowTr(dataProject, counter);
}



function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}


function createTable(){
  readTextFile("./../test_Json/test_Project_Table.json", function(text){
    var data = JSON.parse(text);
    var counter = 0;
    data.forEach(element => {
      addRowTableProject(element, counter)
      counter++;
    });
  });
};
  

createTable()


function buildRowTr(element, counter){

  var colorstate = 'gray';
  var colorRow = 'white';
  if(counter%2==0){
  colorRow = 'white'
  }else{
  colorRow = '#f2f2f2'
  }

  switch (element.state) {
    case "Finished":
      colorstate = 'green'
      break;
    case "Process":
      colorstate = 'yellow'
      break;
    case "Not started":
      colorstate = 'red'
      break;
    default:
      colorstate = 'gray'
      break;
  }
    console.log(element.name)
  return `<tr style="background-color: ${colorRow};">
            <td>${element.name}</td>
            <td>${element.description}       
              <div class="w3-dropdown-hover">Tokyo
                <div class="w3-dropdown-content w3-card-4" style="width:250px">
                  <img src="img_tokyo.jpg" alt="Tokyo" style="width:100%">
                  <div class="w3-container">
                    <p>Tokyo is the capital city of Japan.</p>
                    <p>13 million inhabitants.</p>
                  </div>
                </div>
              </div>
            </td>
            <td>${element.members}</td>
            <td class="w3-text-${colorstate}">${element.state}</td>
            <td>
              <div class="w3-display-container" style="display: flex; align-items: center;">
                <div class="w3-tooltip" style="position: relative;">
                  <i class="fas fa-eye w3-hover-text-blue" style="margin-right: 20%;"></i>
                  <span style="position:absolute; left:0; bottom:78%;" class="w3-text w3-tag w3-round w3-dark-grey w3-small w3-animate-opacity">
                      View
                  </span>
                </div>
          
                <div class="w3-tooltip" style="position: relative; margin-left: 15%;">
                  <i class="fas fa-trash-alt w3-hover-text-red" style="margin-left: 40%;"></i>
                  <span style="position:absolute; left:0; bottom:78%;" class="w3-text w3-tag w3-round w3-dark-grey w3-small w3-animate-opacity">
                      Delete
                  </span>
                </div>
              </div>
            </td>
          </tr>`
}






function OpenModalEdit(id) {
  optionCreateEdit = false
  idSubject = id;
  var textButton = document.getElementById('Guardar_Editar');
  textButton.innerText = "Editar";

  $.getScript("Service.js", () => {
    GETbyID(API_URL + idSubject)
    .then(courses => {
      document.getElementById('nameSubject').value = courses.nameSubject;
      document.getElementById('creditsSubject').value = courses.creditsSubject;
      document.getElementById('quotesSubject').value = courses.quotesSubject;
      document.getElementById('descriptionSubject').value = courses.descriptionSubject;
    });
  });
  //document.getElementById('nameSubject').value = document.getElementById('nameSubject'+ idSubject).innerText;
  document.getElementById('modalCreateProject').style.display='block'
  
}

function OpenModalCreate() {
  optionCreateEdit = true
  var textButton = document.getElementById('Guardar_Editar');
  textButton.innerText = "Save";
  document.getElementById('nameProject').value = '';
  document.getElementById('membersProject');
  document.getElementById('stateProject');
  document.getElementById('descriptionProject').value = '';

  document.getElementById('modalCreateProject').style.display='block'
}


