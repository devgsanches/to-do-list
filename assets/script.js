const form = document.getElementById('item-form')
const list = document.getElementById('list')
const itemInput = document.getElementById('item-name')

function createDeleteButton() {
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delet-icon')

  const deleteSpan = document.createElement('span')
  deleteSpan.textContent = 'Deletar'

  const deleteIcon = document.createElement('img')
  deleteIcon.src = './assets/images/lixeira.svg'
  deleteIcon.alt = 'Ícone de lixeira'

  deleteButton.append(deleteSpan, deleteIcon)

  return deleteButton
}

function createEditButton() {
  const editButton = document.createElement('button')
  editButton.classList.add('edit-icon')

  const editIcon = document.createElement('img')
  editIcon.src = './assets/images/edit.svg'
  editIcon.alt = 'Ícone de lápis'

  editButton.appendChild(editIcon)

  return editButton
}

function createConfirmButton() {
  const confirmButton = document.createElement('button')
  confirmButton.classList.add('confirm-icon')
  confirmButton.classList.add('hidden')
  confirmButton.setAttribute('type', 'button')

  confirmButton.textContent = 'Confirmar'

  return confirmButton
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const li = document.createElement('li')

  const itemTitleDiv = document.createElement('div')
  itemTitleDiv.classList.add('task')

  const itemTitleInput = document.createElement('input')
  itemTitleInput.setAttribute('type', 'checkbox')

  const itemTitleSpan = document.createElement('span')
  itemTitleSpan.textContent = itemInput.value

  itemTitleInput.addEventListener('change', checkedItem)

  const editItemInput = document.createElement('input')
  editItemInput.setAttribute('type', 'text')
  editItemInput.classList.add('hidden')

  const itemIconsDiv = document.createElement('div')
  itemIconsDiv.classList.add('icons')

  const deleteButton = createDeleteButton()
  const editButton = createEditButton()
  const confirmButton = createConfirmButton()

  deleteButton.addEventListener('click', deleted)
  editButton.addEventListener('click', edit)
  confirmButton.addEventListener('click', confirm)

  if (!itemInput.value) {
    return null
  } else {
    itemTitleDiv.append(itemTitleInput, itemTitleSpan, editItemInput)
    itemIconsDiv.append(deleteButton, editButton, confirmButton)
  }

  li.append(itemTitleDiv, itemIconsDiv)
  list.appendChild(li)
  clearTaskField()

  function checkedItem() {
    li.classList.toggle('checked')
  }

  function deleted() {
    li.remove()
  }

  function edit() {
    itemTitleSpan.classList.add('hidden')
    itemTitleInput.classList.add('hidden')

    deleteButton.classList.add('hidden')
    editButton.classList.add('hidden')

    editItemInput.classList.remove('hidden')
    confirmButton.classList.remove('hidden')

    editItemInput.value = itemTitleSpan.textContent
  }

  function confirm() {
    itemTitleSpan.classList.remove('hidden')
    itemTitleInput.classList.remove('hidden')

    deleteButton.classList.remove('hidden')
    editButton.classList.remove('hidden')

    editItemInput.classList.add('hidden')
    confirmButton.classList.add('hidden')

    itemTitleSpan.textContent = editItemInput.value
  }

  function clearTaskField() {
    itemInput.value = ''
  }
})
