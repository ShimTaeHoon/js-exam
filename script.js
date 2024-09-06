let bookNo = 0;
let bookArr = [];

// 도서 등록 정규식 등
function registerBook() {

  let regCategory = document.getElementById('category').value;
  let regBook = document.getElementById('bookname').value;
  let regPrice = document.getElementById('bookprice').value;

  if (regCategory == "") {
    alert("카테고리를 선택해주세요");
    return;
  }

  if (regBook == "") {
    alert("도서명을 입력하세요");
    return;
  }

  if (regPrice == "") {
    alert("가격을 입력하세요");
    return;
  }

  if (bookValidate(regCategory, regBook)) {
    return;
  }

  alert('도서가 성공적으로 등록되었습니다.');

  increaseNo();
  addDataToTable();

}

// 도서번호 증가
function increaseNo() {

  bookNo++;

};

// 도서 등록해서 불러온 값들 도소목록에 띄우기
function addDataToTable() {

  let getCategory = document.getElementById('category').value;
  let getBookName = document.getElementById('bookname').value;
  let getPrice = document.getElementById('bookprice').value;

  const tableBody = document.getElementById('book-list-div').querySelector('tbody');

  bookArr.push(
    {
      number: bookNo,
      category: getCategory,
      name: getBookName,
      price: getPrice
    }
  );

  let newRow = `
  <tr>
      <td>${bookNo}</td>
      <td>${getCategory}</td>
      <td>${getBookName}</td>
      <td>${getPrice}</td>
      <td><input type="button" name="removeBtn" value="삭제" onclick="removeBtn(this)"></td>
  </tr>    
  `;
  tableBody.insertAdjacentHTML("beforeend", newRow);

};

function bookValidate(category, bookName) {
  for (let book of bookArr) {
    if (book.category === category && book.name === bookName) {
      alert('같은 카테코리 안에 동일한 책이 중복되어 있습니다.');
      return true;
    }
  }
  return false;
}

function removeBtn(button) {
  let row = button.closest('tr');
  if (row) {
    row.remove();
  }

  let number = row.cells[0].textContent;
  bookArr.forEach((book, index) => {
    if (book.number == number) {
      bookArr.splice(index, 1);
    }
  });
}

function searchBook() {
  const searchValue = document.getElementById('search-input').value.trim();
  const table = document.getElementById('book-list-div');
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(function (row) {
    const bookCell = row.querySelectorAll('td')[2];
    const bookText = bookCell.textContent.trim();

    if (searchValue === "") {
      row.style.display = "";
    } else {
      row.style.display = bookText.includes(searchValue) ? "" : "none";
    }
  });

}

function sortBook() {
  let sortOrder = document.getElementById('sort-select').value;
  let tableBody = document.getElementById('book-list-tbody');



  bookArr.sort((a, b) => {
    let priceA = parseFloat(a.price);
    let priceB = parseFloat(b.price);

    if (sortOrder === 'ascending') {
      return priceA - priceB;
    } else if (sortOrder === 'descending') {
      return priceB - priceA;
    } else {
      return 0;
    }
  });

  tableBody.innerHTML = '';

  bookArr.forEach(book => {
    let newRow = `
      <tr>
          <td>${book.number}</td>
          <td>${book.category}</td>
          <td>${book.name}</td>
          <td>${book.price}</td>
          <td><input type="button" name="removeBtn" value="삭제" onclick="removeBtn(this)"></td>
      </tr>    
    `;
    tableBody.insertAdjacentHTML('beforeend', newRow);
  });

}