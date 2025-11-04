
const baseUrl = 'http://localhost:3000/api/students';
updateTable(baseUrl);
function updateTable(url) {
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
      editBtn.textContent = 'E';
      //let ie = document.createElement('i');
      //ie.classList.add('fa-solid');
      //ie.classList.add('fa-pencil');
      //editBtn.append(ie);
      editBtn.onclick = editRow;
      let removeBtn = document.createElement('button');
      removeBtn.textContent = 'X';
      //let ir = document.createElement('i');
      //ir.classList.add('fa-solid');
      //ir.classList.add('fa-trash');
      //removeBtn.append(ir);
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
  console.log(event.submitter.value); // que boton clickeaste
  let form = event.target;
  if (event.submitter.value == 'Nuevo alumno') {
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
    fetch(baseUrl, options)
      .then(res => res.json())
      .then(newStudent => {
        updateTable(baseUrl); 
      })
      .catch(err => console.error(err));
  } else if (event.submitter.value == 'Filtrar') {
    // updateTable(otraUrl)
    const filters = {
      name: form.name.value,
      surname: form.surname.value,
      age: form.age.value,
      grade: form.grade.value
    };
    console.log(filters);
    let url = baseUrl + '?'
    for (let key in filters) {
      if (filters[key]) url += `${key}=${filters[key]}&`;
    }
    url = url.slice(0,-1);
    console.log(url);
    updateTable(url);
  }
  form.reset();
}  

function editRow(e) {
  let btn = e.target;
  let row = e.target.parentElement.parentElement;
  if (btn.textContent == 'E') {
    let i = 1;
    while (i < row.children.length - 1) {
      row.children[i].contentEditable = true;
      i++;
    }
    row.children[i].children[0].textContent = 'G';
  } else {
    let data = {
      name: row.children[1].textContent,
      surname: row.children[2].textContent,
      age: row.children[3].textContent,
      grade: row.children[4].textContent,
    };
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const id = row.children[0].textContent;
    fetch(baseUrl+'/'+id, options)
      .then(res => res.json())
      .then(data => {
        updateTable(baseUrl);
      })
      .catch(err => console.error(err));
  }
}

function removeRow(e) {
  console.log(e.currentTarget);
  console.log(e.currentTarget.dataset.studentId);
  let id = e.currentTarget.dataset.studentId;
  const options = {
    method: 'DELETE'
  };
  fetch(baseUrl + '/' + id, options)
    .then(res => res.json())
    .then(data => {
      updateTable(baseUrl);
    });
}
