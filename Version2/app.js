var API_URL = 'http://localhost:8080/CourseSearch/';
let courses = {};

const formCreateSubject = document.querySelector('form')

var optionCreateEdit = true
var idSubject = 0


function createTable(){
  $.getScript("Service.js", () => {
    GET(API_URL + "courses")
    .then(courses => {
      document.getElementById("table").innerHTML = ''; 
      document.getElementById("table").innerHTML = `<thead><tr class="w3-blue-gray">
      <th>Código</th>
      <th>Nombre</th>
      <th>Créditos</th>
      <th>Cupos disponibles</th>
      <th>Acciones</th>
      </tr></thead>`; 
      for (let course in courses){
        document.getElementById("table").innerHTML += `<tr>
        <td >${courses[course].codeSubject} </td>
        <td id="nameSubject${courses[course].codeSubject}">${courses[course].nameSubject} </td>
        <td>${courses[course].creditsSubject}</td>
        <td>${courses[course].quotesSubject}</td>
        <td> <button onclick="OpenModalEdit(${courses[course].codeSubject})" class="w3-button w3-circle" data-bs-toggle="tooltip" title="Editar" ><i class="fa fa-pencil w3-large " ></i></button> 
        <button class="w3-button w3-circle" onclick="OpenModalDelete(${courses[course].codeSubject})" data-bs-toggle="tooltip" title="Eliminar"><i class="fa  fa-trash w3-large"></i></button></td>
        </tr>`; 
      }
    });
  });
};
  

createTable()

const createSubject = () => {
  const formData = new FormData(document.querySelector('#formCreateCourse'));

  if(!formData.get('nameSubject').length || !formData.get('creditsSubject') || !formData.get('quotesSubject')) {
    document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
    return;
  }
  document.querySelector('#msgFormAdd').innerHTML = '';

  const subject = {
    nameSubject: formData.get('nameSubject'),
    codeCreateSubject: formData.get('codeSubject'),
    creditsSubject: formData.get('creditsSubject'),
    quotesSubject: formData.get('quotesSubject'),
    descriptionSubject: formData.get('descriptionSubject'),
  }


  if (optionCreateEdit){  
    $.getScript("Service.js", () => {
    POST(API_URL + "create-course", subject)
    .then(res =>{
      document.querySelector('#formCreateCourse').reset();
      createTable();
      alertify.success('Se creó el curso '+ subject.nameSubject)
    }) 
    .catch(error => {
      console.log(error)
      alertify.error('Error')
    })
    });
  } else {
    $.getScript("Service.js", () => {
      PUT(API_URL + "update-course/" + idSubject, subject)
      .then(res =>{
        document.querySelector('#formCreateCourse').reset();
        
      alertify.success('Se editó el curso '+ idSubject)
        createTable();
      }) 
      .catch(error => {
        console.log(error)
        alertify.error('Error')
      })
      });
  }
  document.getElementById('modalCreateCourse').style.display='none'

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
  document.getElementById('modalCreateCourse').style.display='block'
  
}

function OpenModalCreate() {
  optionCreateEdit = true
  var textButton = document.getElementById('Guardar_Editar');
  textButton.innerText = "Guardar";
  document.getElementById('nameSubject').value = '';
  document.getElementById('creditsSubject').value = '';
  document.getElementById('quotesSubject').value = '';
  document.getElementById('descriptionSubject').value = '';

  document.getElementById('modalCreateCourse').style.display='block'
}

function OpenModalDelete(id) {
  idSubject = id;
  document.getElementById('modalDeleteCourse').style.display='block' 
}

function DeleteElement() { 
  $.getScript("Service.js", () => {
    Delete(API_URL + "delete-course/" + idSubject)
    createTable();
    document.getElementById('modalDeleteCourse').style.display='none'
    alertify.error('Se eliminó el curso')
  });
}








