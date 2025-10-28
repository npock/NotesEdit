document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const editTitle = prompt("new title please...");
    if (editTitle !== null && editTitle.trim() !== "") {
      edit(id, editTitle).then(() => {
        const element = event.target.closest("li");
        const clickedButtonHTMLDiv = event.target.closest("div").outerHTML;

        element.innerHTML = editTitle + clickedButtonHTMLDiv;
      });
    } else if (editTitle === null) {
      alert("Вы отменили ввод.");
    } else if (editTitle.trim() === "") {
      alert("пустой строки не должно быть");
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, editTitle) {
  const editNote = { title: editTitle, id: id };
  console.log("edit", editNote);
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editNote),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // return response.json();
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
}
