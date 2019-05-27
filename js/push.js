class Pushup {
  constructor(sets, reps, date) {
    this.sets = sets,
    this.reps = reps,
    this.date = date
  }
}


// UI Class

class UI {
  static displayPushups() {
    const pushups = Store.getPushups();
    pushups.forEach(pushup => UI.addPushupToList(pushup))
  }

  static addPushupToList(pushup) {
    const list = document.querySelector('#pushup-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${ pushup.sets }</td>
      <td>${ pushup.reps }</td>
      <td>${ pushup.date }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#pushup-form');
    container.insertBefore(div, form);
    //Vanishing after 3 secs.
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  static deletePushup(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#sets').value = '';
    document.querySelector('#reps').value = '';
    document.querySelector('#date').value = '';
  }
}

///Store Rutines

class Store {

  static getPushups() {
    let pushups;
    if (localStorage.getItem('pushups') === null) {
      pushups = []
    } else {
      pushups= JSON.parse(localStorage.getItem('pushups'));
    }
    return pushups;
  }

  static addPushup(pushup) {
    const pushups = Store.getPushups();
    pushups.push(pushup);
    localStorage.setItem('pushups', JSON.stringify(pushups));
  }

  static removePushup() {
    const pushups = Store.getPushups();
    pushups.forEach((pushup, idx) => {
      if (pushup.date === date) {
        pushups.splice(idx, 1)
      }
    })
    localStorage.setItem('pushups', JSON.stringify(pushups))
  }
}

//Events diplsay Rutines
document.addEventListener('DOMContentLoaded', UI.displayPushups());

//Event Add Rutine
document.querySelector('#pushup-form').addEventListener('click', e => {
  //Prevent Default
  e.preventDefault();
  //Get Values from the form
  const sets = document.querySelector('#sets').value;
  const reps = document.querySelector('#reps').value;
  const date = document.querySelector('#date').value;
  //Validates Fields
  if (sets === '' || reps === '' || date === '') {
    UI.showAlert('Please fill in all the fields..', 'danger');
  } else {
    //Instance the Object
    const pushup = new Pushup(sets, reps, date);
    //Add Book to UI
    UI.addPushupToList(pushup);
    //Add Book to Local Storage
    Store.addPushup(pushup);
    //Show Successs Message
    UI.showAlert('Pushup Added', 'success');
    //Clear Fields
    UI.clearFields();
  }
})

//Event Delete Book
document.querySelector('#pushup-list').addEventListener('click', e => {
  UI.deletePushup(e.target);
  Store.removePushup(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert('Pushup Successfully Removed', 'success');
})