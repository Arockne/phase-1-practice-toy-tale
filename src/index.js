let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', storeToy)

});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(createToy));
}

function createToy(toy) {
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  
  const p = document.createElement('p');
  p.textContent = `${toy.likes} likes`;

  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy.id;
  btn.textContent = 'like'
  btn.addEventListener('click', addLikes);

  const div = document.createElement('div');
  div.className = 'card';

  div.append(h2, img, p, btn);
  document.querySelector('#toy-collection').appendChild(div);
}

function storeToy(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelectorAll('.input-text');
  
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: input[0].value,
      image: input[1].value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(createToy);
}

function addLikes(e) {
  const btn = e.target;
  const likes = e.target.parentNode.querySelector('p');

  let numLikes = Number(likes.textContent.split(' ')[0]);
  numLikes += 1;

  likes.textContent = `${numLikes} likes`;

  fetch(`http://localhost:3000/toys/${btn.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: numLikes})
  })
}