function onInit() {
    
    renderBooks()
}
function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderBooks();
}
function onSortBy(str) {
    sortBy(str)
    renderBooks()
}
function onTurnPage(diff) {
    turnPage(diff);
    renderBooks();
    renderPageNum();
}
function renderPageNum(){
    document.querySelector('.pages span').innerText = getPage();
  }

function renderBooks() {
    var books = getBooksToDisplay()
    var strHTMLs = books.map(function (book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td><button class="btn-table-read" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="btn-table-update" onclick="onUpdateBook(this,'${book.id}')">Update</button></td>
        <td><button class="btn-table-delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>
        `
    })
    var elBooksTbody = document.querySelector('.books-tbody')
    elBooksTbody.innerHTML = strHTMLs.join('')
    renderButtonsNames()
}
function renderButtonsNames() {
    var elBtnsRead = document.querySelectorAll('.btn-table-read')
    elBtnsRead.forEach(function (td) {
        td.dataset.trans = "btn-table-read"
    })
    var elBtnsUpdate = document.querySelectorAll('.btn-table-update')
    elBtnsUpdate.forEach(function (td) {
        td.dataset.trans = "btn-table-update"
    })
    var elBtnsPriceUpdate = document.querySelectorAll('.btn-table-price-update')
    elBtnsPriceUpdate.forEach(function (btn) {
        btn.dataset.trans = "btn-table-price-update"
    })
    var elBtnsDelete = document.querySelectorAll('.btn-table-delete')
    elBtnsDelete.forEach(function (td) {
        td.dataset.trans = "btn-table-delete"
    })
    doTrans()
}
function onAddBook() {
    var elBtnAddBook = document.querySelector('.add-book')
    var elName = document.querySelector('input[name=new-book-name]')
    var elPrice = document.querySelector('input[name=new-book-price]')
    var elUpdate = document.querySelector('.new-book-update')
    var elBtnClose = document.querySelector('.new-book-close')
    elBtnAddBook.hidden = true
    elName.hidden = false
    elPrice.hidden = false
    elUpdate.hidden = false
    elBtnClose.hidden = false
    elBtnClose.onclick = (function () { return closeWithoutAdd() })
    elUpdate.onclick = (function () { return onAddBookUpdate(elName.value, elPrice.value) })
}
function closeWithoutAdd() {
    var elName = document.querySelector('input[name=new-book-name]')
    var elPrice = document.querySelector('input[name=new-book-price]')
    var elUpdate = document.querySelector('.new-book-update')
    var elBtnAddBook = document.querySelector('.add-book')
    var elBtnClose = document.querySelector('.new-book-close')
    elName.hidden = true
    elPrice.hidden = true
    elUpdate.hidden = true
    elBtnClose.hidden = true
    elBtnAddBook.hidden = false
}
function onAddBookUpdate(name, price) {
    var elName = document.querySelector('input[name=new-book-name]')
    var elPrice = document.querySelector('input[name=new-book-price]')
    var elUpdate = document.querySelector('.new-book-update')
    var elBtnAddBook = document.querySelector('.add-book')
    var elBtnClose = document.querySelector('.new-book-close')
    elName.hidden = true
    elPrice.hidden = true
    elUpdate.hidden = true
    elBtnClose.hidden = true
    elBtnAddBook.hidden = false
    addBook(name, price)
    renderBooks()
}
function onReadBook(bookId) {
    var book = getBookById(bookId)
    var rate = document.querySelector('input[name=rate]')
    rate.value = 5
    var elModal = document.querySelector('.modal')
    var elBtnMinus = document.querySelector('.btn-rate-minus')
    var elBtnPlus = document.querySelector('.btn-rate-plus')
    var elBtnUpdate = document.querySelector('.btn-rate-update')
    var elModalBookName = document.querySelector('.book-modal-name ')
    var elModalBookPrice = document.querySelector('.book-modal-price')
    var elModalBookRate = document.querySelector('.book-modal-rate')
    var elModalBookDesc = document.querySelector('.book-modal-desc')
    elBtnMinus.onclick = function () { return onChangeRateValue(-1) }
    elBtnPlus.onclick = function () { return onChangeRateValue(1) }
    elBtnUpdate.onclick = function () { return onRateUpdate(`${bookId}`) }
    elModalBookRate.innerText = book.rate
    elModalBookName.innerText = book.name
    elModalBookPrice.innerText = book.price
    elModalBookDesc.innerText = book.desc
    elModal.hidden = false
}

function onChangeRateValue(diff) {
    var rate = document.querySelector('input[name=rate]')
    rate.value = +rate.value + diff
    if (rate.value < 0) rate.value = 0
    if (rate.value > 10) rate.value = 10
}
function onRateUpdate(bookId) {
    var book = getBookById(bookId)
    var rate = document.querySelector('input[name=rate]').value
    rateUpdate(bookId, rate)
    var elModalBookRate = document.querySelector('.book-modal-rate')
    elModalBookRate.innerText = book.rate
}
function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.hidden = true

}
function onUpdateBook(elBtnUpdate, bookId) {
    var book = getBookById(bookId)
    elBtnUpdate.hidden = true
    var strHTMLs = `<button class="btn btn-minus-one" onclick="onChangePriceValue(-1)">-1</button>
    <button class="btn btn-minus-ten" onclick="onChangePriceValue(-10)">-10</button>
    <input type="text" name="tablePrice" value="${book.price}">
    <button class="btn btn-plus-one" onclick="onChangePriceValue(1)">+1</button>
    <button class="btn btn-plus-ten" onclick="onChangePriceValue(10)">+10</button>
    <button class="btn btn-table-price-update" onclick="onPriceUpdate('${bookId}')">update</button>`
    elBtnUpdate.parentElement.innerHTML = strHTMLs
    renderButtonsNames()
}

function onChangePriceValue(diff) {
    var elPrice = document.querySelector('input[name=tablePrice]')
    elPrice.value = +elPrice.value + diff
    if (elPrice.value < 0) elPrice.value = 0
}
function onPriceUpdate(bookId) {
    var elPrice = document.querySelector('input[name=tablePrice]').value
    priceUpdate(bookId, elPrice)
    renderBooks()
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}
