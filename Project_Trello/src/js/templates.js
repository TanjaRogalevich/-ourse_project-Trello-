function buildTemplate({
  id,
  title,
  description,
  createdAt,
  userName,
  status,
}) {
  const time = `${createdAt.getDate().toString().padStart(2, '0')}.${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${createdAt.getFullYear()}  ${createdAt
    .getHours()
    .toString()
    .padStart(2, '0')}:${createdAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${createdAt.getSeconds().toString().padStart(2, '0')}`;

  return `
      <div class="todo__card" data-id="${id}">
        <span class="card__title">${title}</span>
        <span class="card__description">${description}</span>
        <span class="card__user-name">${userName}</span>
        <select class="card__status" data-role="status">
          <option value="todo" ${
            status == 'todo' ? 'selected' : ''
          }>Todo</option>
          <option value="in-progress" ${
            status == 'in-progress' ? 'selected' : ''
          }>In Progress</option>
          <option value="done" ${
            status == 'done' ? 'selected' : ''
          }>Done</option>
        </select>
        <div class="card__options">
          <span class="card__date">${time}</span>
          <div class="card__buttons">
            <button class="edit-btn" data-role="edit">Edit</button>
            <button class="delete-btn" data-role="remove">Delete</button>
          </div>
        </div>
      </div>
    `;
}

export { buildTemplate };
