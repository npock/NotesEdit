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
      edit(id, editTitle)
        .then((newNote) => {
          console.log(newNote);
          const element = event.target.closest("li");
          const clickedButtonHTMLDiv = event.target.closest("div").outerHTML;

          element.innerHTML = newNote.title + clickedButtonHTMLDiv;
        })
        .catch((error) => {
          console.error("Ошибка при редактировании:", error);
          alert("Произошла ошибка при сохранении изменений.");
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
  try {
    const editNote = { title: editTitle, id: id };

    const response = await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editNote),
    });
    if (!response.ok) {
      throw new Error("Ошибка в запросе на сервер");
    }
    const newNote = await response.json();
    return newNote;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
