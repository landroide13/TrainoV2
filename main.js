class Rutine {
  constructor(pusets, pureps, squsets, squreps, km, time, date) {
    this.pusets = pusets,
    this.pureps = pureps,
    this.squsets = squsets,
    this.squreps = squreps,
    this.time = time,
    this.km = km,
    this.date = date
  }
}

// UI Class
class UI {
  static displayRutines() {
    const rutines = Store.getRutines();
    rutines.forEach(rutine => UI.addRutineToList(rutine))
  }

  static addRutineToList(rutine) {
    const pushList = document.querySelector('#pushup-list');
    const squatList = document.querySelector('#squat-list');
    const runList = document.querySelector('#runn-list');
    const row1 = document.createElement('tr');
    const row2 = document.createElement('tr');
    const row3 = document.createElement('tr');

    row1.innerHTML = `
      <td>${ rutine.pusets }</td>
      <td>${ rutine.pureps }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    row2.innerHTML = `
      <td>${ rutine.squsets }</td>
      <td>${ rutine.squreps }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    row3.innerHTML = `
      <td>${ rutine.km }</td>
      <td>${ rutine.time }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    pushList.appendChild(row1);
    squatList.appendChild(row2);
    runList.appendChild(row3);
  }

  static showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#rutine-form');
    container.insertBefore(div, form);
    //Vanishing after 3 secs.
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  static deleteRutine(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#pusets').value = '';
    document.querySelector('#pureps').value = '';
    document.querySelector('#squsets').value = '';
    document.querySelector('#squreps').value = '';
    document.querySelector('#km').value = '';
    document.querySelector('#time').value = '';
    document.querySelector('#date').value = '';
  }
}

///Store Rutines

class Store {

  static getRutines() {
    let rutines;
    if (localStorage.getItem('rutines') === null) {
      rutines = []
    } else {
      rutines = JSON.parse(localStorage.getItem('rutines'));
    }
    return rutines;
  }

  static addRutine(rutine) {
    const rutines = Store.getRutines();
    rutines.push(rutine);
    localStorage.setItem('rutines', JSON.stringify(rutines));
  }

  static removeRutine() {
    const rutines = Store.getRutines();
    rutines.forEach((rutine, idx) => {
      if (rutine.id === id) {
        rutines.splice(idx, 1)
      }
    })
    localStorage.setItem('rutines', JSON.stringify(rutines))
  }
}

//Events diplsay Rutines
document.addEventListener('DOMContentLoaded', UI.displayRutines());

//Event Add Rutine
document.querySelector('#rutine-form').addEventListener('submit', e => {
  //Prevent Default
  e.preventDefault();
  //Get Values from the form
  const pusets = document.querySelector('#pusets').value;
  const pureps = document.querySelector('#pureps').value;
  const squsets = document.querySelector('#squsets').value;
  const squreps = document.querySelector('#squreps').value;
  const km = document.querySelector('#km').value;
  const time = document.querySelector('#time').value;
  const date = document.querySelector('#date').value;
  //Validates Fields
  if (pusets === '' || squsets === '' || pureps === '' || date === '') {
    UI.showAlert('Please fill in all the fields..', 'danger');
  } else {
    //Instance the Object
    const rutine = new Rutine(pusets, squsets, pureps, squreps, km, time, date);
    //Add Book to UI
    UI.addRutineToList(rutine);
    //Add Book to Local Storage
    Store.addRutine(rutine);
    //Show Successs Message
    UI.showAlert('Rutine Successfully Added', 'success');
    //Clear Fields
    UI.clearFields();
  }
})

//Event Delete Book
document.querySelector('#pushup-list').addEventListener('click', e => {
  UI.deleteRutine(e.target);
  Store.removeRutine(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert('Rutine Successfully Removed', 'success');
});

document.querySelector('#squat-list').addEventListener('click', e => {
  UI.deleteRutine(e.target);
  Store.removeRutine(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert('Rutine Successfully Removed', 'success');
});

document.querySelector('#runn-list').addEventListener('click', e => {
  UI.deleteRutine(e.target);
  Store.removeRutine(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert('Rutine Successfully Removed', 'success');
});



































