const url = 'http://localhost:3000/api/students';
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
      tbody.append(tr);
    }
  });