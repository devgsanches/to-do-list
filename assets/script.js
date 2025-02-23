const form = document.getElementById('item-form')
const list = document.getElementById('list')
const itemInput = document.getElementById('item-name')

let items = []

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

function createLi(itemId, itemTitle, checked) {
  const li = document.createElement('li')
  li.setAttribute('data-id', itemId)

  const itemTitleDiv = document.createElement('div')
  itemTitleDiv.classList.add('task')

  const itemTitleInput = document.createElement('input')
  itemTitleInput.setAttribute('type', 'checkbox')
  if (checked) {
    itemTitleInput.setAttribute('checked', checked)
    li.classList.add('checked')
  }

  const itemTitleSpan = document.createElement('span')
  itemTitleSpan.textContent = itemTitle

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

  itemTitleDiv.append(itemTitleInput, itemTitleSpan, editItemInput)
  itemIconsDiv.append(deleteButton, editButton, confirmButton)
  li.append(itemTitleDiv, itemIconsDiv)

  return li

  function checkedItem() {
    li.classList.toggle('checked')
    const itemId = Number(li.getAttribute('data-id')) // data-id retorna uma string, por estar sendo buscado do HTML, como os IDs dos itens são todos números, na hora de buscar um item, nenhum id corresponde a uma string, justamente por serem numeros, então não retorna elemento e não modifica a propriedade;
    const item = items.find((item) => item.id === itemId)
    item.checked = !item.checked

    localStorage.setItem('items', JSON.stringify(items))
  }

  function deleted() {
    const itemId = Number(li.getAttribute('data-id'))
    li.remove()

    items = items.filter((item) => item.id !== itemId)
    localStorage.setItem('items', JSON.stringify(items))
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

    const itemId = Number(li.getAttribute('data-id'))
    const item = items.find((item) => item.id === itemId)
    item.title = editItemInput.value
    localStorage.setItem('items', JSON.stringify(items))
  }
}

function loadItems() {
  const itemsFromStorage = localStorage.getItem('items')

  if (!itemsFromStorage) {
    return
  }

  items = JSON.parse(itemsFromStorage)

  for (const item of items) {
    const itemsLi = createLi(item.id, item.title, item.checked)
    list.appendChild(itemsLi)
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const itemTitle = itemInput.value
  const itemId = new Date().getTime()

  const li = createLi(itemId, itemTitle, false)
  if (!itemTitle) {
    return
  } else {
    list.appendChild(li)
  }

  items.push({
    id: itemId,
    title: itemTitle,
    checked: false,
  })

  localStorage.setItem('items', JSON.stringify(items))
  clearTaskField()
})
function clearTaskField() {
  itemInput.value = ''
}

loadItems()
