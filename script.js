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
            <td class="table-click-remove smaller-th-td remove"><a href="#" ><i class="fa-solid fa-trash-can"></i></a></td>
            `;

        list.appendChild(row);

   }

   static clearFields()
   {
        document.querySelector(".title").value = "";
        document.querySelector(".author").value = "";
        document.querySelector(".isbn").value = "";
        document.querySelector(".buy").value = "";
   }

   static removeBooks(el)
   {
        if (el.classList.contains("remove")){
            el.parentElement.remove();
        }
   }

}

/* EVENTS */
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    /* ADDING BOOKS */
   
    document.querySelector("#book-form").addEventListener("submit", (e) => {

            e.preventDefault();

            /* GET INPUT VALUES */
            const title = document.querySelector('.title').value;
            const author = document.querySelector('.author').value;
            const isbn = document.querySelector('.isbn').value;
            const buy = document.querySelector('.buy').value;
            const nodeLists = [title, author, isbn, buy];
            const titleEmpty = document.querySelector('.title');
            const authorEmpty = document.querySelector('.author');
            const isbnEmpty = document.querySelector('.isbn');
            const buyEmpty = document.querySelector('.buy');
            const emptyInput = [titleEmpty, authorEmpty, isbnEmpty, buyEmpty];
            /* VALIDATING */
            nodeLists.forEach((element, index) => {
                
                if (element === "" || element === null)
                {
                    console.log(index);
                    emptyInput[index].classList.add("emptyInput");
                }  else 
                {
                    emptyInput[index].classList.remove("emptyInput")
                }
            })
            if (title === "" || author === "" ||  isbn ==="" ||  buy === "")
            {
                const error = document.querySelector('p');
                setInterval(()=>{    
                    error.setAttribute('class', 'error');
                    error.innerHTML = `YOU NEED TO FILL ALL FIELDS!`
                }, 5000);
            } else
            {
                const book = new Book(title, author, isbn);
                const success = document.querySelector('p');
                success.setAttribute('class', 'success');
                success.innerHTML = `You have added your book!`;
                UI.addBookToList(book);
                UI.clearFields();
            }
        }
    )

    /* REMOVING BOOKS */
    document.querySelector(".book-lists").addEventListener('click', (e) => {
        UI.removeBooks(e.target);
    })
