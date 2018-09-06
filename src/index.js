document.addEventListener('DOMContentLoaded', () => {

const table = document.getElementById('table-body')
const dog_form = document.getElementById('dog-form')

  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(data => data.forEach((dog) => {
    var row = table.insertRow(0);
    row.dataset.id = dog.id
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    // Add some text to the new cells:
    cell1.innerHTML = `${dog.name}`
    cell2.innerHTML = `${dog.breed}`
    cell3.innerHTML = `${dog.sex}`
    cell4.innerHTML = `<button>Edit Dog </button>`
  }))//end fetch for loading all dogs

  table.addEventListener('click', () =>{
    if (event.target.tagName == "BUTTON")
     dog = event.target.parentNode.parentNode
     let nameInput = document.querySelector('input[name = "name"]')
     let breedInput = document.querySelector('input[name = "breed"]')
     let sexInput = document.querySelector('input[name = "sex"]')

     nameInput.value = dog.querySelectorAll('td')[0].innerText
     breedInput.value = dog.querySelectorAll('td')[1].innerText
     sexInput.value = dog.querySelectorAll('td')[2].innerText

       dog_form.addEventListener('submit', (event) => {
         event.preventDefault()
         let nameInput = document.querySelector('input[name = "name"]')
         let breedInput = document.querySelector('input[name = "breed"]')
         let sexInput = document.querySelector('input[name = "sex"]')
         console.log(dog)
        fetch(`http://localhost:3000/dogs/${dog.getAttribute('data-id')}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: nameInput.value , breed: breedInput.value , sex: sexInput.value })
        }).then(res => res.json())
        .then(data => {dog.querySelectorAll('td')[0].innerText = data.name, dog.querySelectorAll('td')[1].innerText = data.breed,dog.querySelectorAll('td')[2].innerText = data.sex } )

      })//end dog form event listener

  })

})//end dom loaded
