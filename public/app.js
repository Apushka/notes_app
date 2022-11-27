document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  } else if (e.target.dataset.type === "update") {
    const id = e.target.dataset.id;
    const oldTitle = e.target.closest("li").childNodes[0].textContent.trim();
    const newTitle = prompt("Введите новое значение", oldTitle);
    if (newTitle === null) return;
    if (!newTitle.trim().length)
      return alert("Название заметки не может быть пустым");
    update(id, newTitle).then(() => {
      e.target.closest("li").childNodes[0].textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
