/* THE BOOK CLASS */

class Book 
{
    constructor(title, author, isbn, buy)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.buy = buy;
    }
}

/* UI CLASS */

class UI
{
   static displayBooks()
   {
        const storedBooks = 
        [
        ]
        const books = storedBooks;
        books.forEach((book) => UI.addBookToList(book));
   }

    static addBookToList(book)
   {
    const list = document.querySelector(".book-lists");
    const row = document.createElement('tr');

    row.innerHTML =  `     
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td class="table-click-buy smaller-th-td"><a href="#" class="buy"><i class="fa-solid fa-cart-shopping"></i></a></td>
        <td class="table-click-favorite smaller-th-td"><a href="#" class="favorite"><i class="fa-solid fa-star"></i></a></td>
        <td class="table-click-remove smaller-th-td"><a href="#" class="delete"><i class="fa-solid fa-trash-can"></i></a></td>
        `;

    list.appendChild(row);

   }
}

/* EVENTS */
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    /* VALIDATING IF THERE IS SOME TEXT */
   

    

    document.querySelector("#book-form").addEventListener("submit", (e) => {

            e.preventDefault();

            /* GET INPUT VALUES */

            const title = document.querySelector('.title').value;
            const author = document.querySelector('.author').value;
            const isbn = document.querySelector('.isbn').value;
            const buy = document.querySelector('.buy').value;
            /* VALIDATING */

        if (title === "" || author === "" || isbn === "" || buy === "" )
            {
                const error = document.querySelector('p');
                error.setAttribute('class', 'submit-message error');
                error.innerHTML = `You need to type each information`
            } else
            {
                const success = document.querySelector('p');
                const book = new Book(title, author, isbn);
                success.setAttribute('class', 'submit-message success');
                success.innerHTML = `You have added somebook!`

                UI.addBookToList(book);
            }
        }
    )
