
const url = 'http://localhost:3000/api/students';
function updateTable() {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let student of data) {
      let tr = document.createElement('tr');
      for (let prop in student) {
        let td = document.createElement('td');
        td.textContent = student[prop];
        tr.append(td);      
      }
      let actions = document.createElement('td');
      let editBtn = document.createElement('button');
      let ie = document.createElement('i');
      ie.classList.add('fa-solid');
      ie.classList.add('fa-pencil');
      editBtn.append(ie);
      editBtn.onclick = editRow;
      let removeBtn = document.createElement('button');
      let ir = document.createElement('i');
      ir.classList.add('fa-solid');
      ir.classList.add('fa-trash');
      removeBtn.append(ir);
      removeBtn.dataset.studentId = student.id;
      removeBtn.onclick = removeRow;
      actions.append(editBtn, removeBtn);
      tr.append(actions);
      tbody.append(tr);
    }
  });
}
  
function handleSubmit(event) {
  event.preventDefault();
  let form = event.target;
  let data = {
    name: form.name.value,
    surname: form.surname.value,
    age: +form.age.value,
    grade: form.grade.value,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  // hacer la peticion a nuestra API
  fetch(url, options)
    .then(res => res.json())
    .then(newStudent => {
      updateTable(); 
    })
    .catch(err => console.error(err));
  form.reset();
}  

function editRow() {

}

function removeRow(e) {
  console.log(e.currentTarget);
  console.log(e.currentTarget.dataset.studentId);
  let id = e.currentTarget.dataset.studentId;
  const options = {
    method: 'DELETE'
  };
  fetch(url + '/' + id, options)
    .then(res => res.json())
    .then(data => {
      updateTable();
    });
}