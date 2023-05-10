//fetch button
const deleteButton = document.querySelector("a.delete");
//add event listener
deleteButton.addEventListener("click", (e) => {
  const endpoint = `/project/${deleteButton.dataset.doc}`;
  //send delete request for project
  fetch(endpoint, {
    method: "DELETE",
  })
    .then(
      //parse data to js object
      (response) => response.json()
    )
    .then(
      //redirect
      (data) => (window.location.href = data.redirect)
    )
    .catch(
      // if there are some errors, catch them and write in the console
      (err) => console.log(err)
    );
});
