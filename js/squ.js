class Squat {
  constructor(sets, reps, date) {
    this.sets = sets,
    this.reps = reps,
    this.date = date
  }
}


// UI Class

class UIS {
  static displaySquats() {
    const squats = Store.getSquats();
    squats.forEach(squat => UIS.addSquatToList(squat))
  }

  static addSquatToList(squat) {
    const list = document.querySelector('#squat-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${ squat.sets }</td>
      <td>${ squat.reps }</td>
      <td>${ squat.date }</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#squat-form');
    container.insertBefore(div, form);
    //Vanishing after 3 secs.
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  static deleteSquat(el) {
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

  static getSquats() {
    let squats;
    if (localStorage.getItem('squats') === null) {
      squats = []
    } else {
      squats = JSON.parse(localStorage.getItem('squats'));
    }
    return squats;
  }

  static addSquat(squat) {
    const squats = Store.getSquats();
    squats.push(squat);
    localStorage.setItem('squats', JSON.stringify(squats));
  }

  static removeSquat() {
    const squats = Store.getSquats();
    squats.forEach((squat, idx) => {
      if (squat.date === date) {
        squats.splice(idx, 1)
      }
    })
    localStorage.setItem('squats', JSON.stringify(squats))
  }
}

//Events diplsay Rutines
document.addEventListener('DOMContentLoaded', UIS.displaySquats());

//Event Add Rutine
document.querySelector('#squat-form').addEventListener('click', e => {
  //Prevent Default
  e.preventDefault();
  //Get Values from the form
  const sets = document.querySelector('#sets').value;
  const reps = document.querySelector('#reps').value;
  const date = document.querySelector('#date').value;
  //Validates Fields
  if (sets === '' || reps === '' || date === '') {
    UIS.showAlert('Please fill in all the fields..', 'danger');
  } else {
    //Instance the Object
    const squat = new Squat(sets, reps, date);
    //Add Book to UI
    UIS.addSquatToList(squat);
    //Add Book to Local Storage
    Store.addSquat(squat);
    //Show Successs Message
    UIS.showAlert('Squat Added', 'success');
    //Clear Fields
    UIS.clearFields();
  }
})

//Event Delete Book
document.querySelector('#squat-list').addEventListener('click', e => {
  UIS.deleteSquat(e.target);
  Store.removeSquat(e.target.parentElement.previousElementSibling.textContent)
  UIS.showAlert('Squat Successfully Removed', 'success');
})