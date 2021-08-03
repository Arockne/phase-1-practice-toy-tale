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
});

//implement getToys
  //fetches data from db
  //for each toy in db 
    //hold all info in a div with class of card
      //h2 with toys name
      //img with src
      //p with likes
      //btn with class like-btn
        //id with toy attribute
function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => createToy(toy)));
}