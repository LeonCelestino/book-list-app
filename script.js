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

class StorageBooks {
   
    static gettingData ()
    {
        let userBooks;
        
        if (localStorage.getItem('userBooks') === null) {
            userBooks = [ ];
        } else{
             userBooks = JSON.parse(window.localStorage.getItem('userBooks'));
      }
      return userBooks;
    }

    static storingData (book)
    {
       const userBooks = StorageBooks.gettingData();
       userBooks.push(book);
       localStorage.setItem('userBooks', JSON.stringify(userBooks));
    }

    static removingData (isbn)
    {
        const books = StorageBooks.gettingData();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
                console.log("true");
            } else {
                console.log("false");
            }
        });
        localStorage.setItem('userBooks', JSON.stringify(books));
    }

}
class UI
{
   static displayBooks()
   {
        const books = StorageBooks.gettingData();
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
            <td class="table-click-buy smaller-th-td"><a href="${book.buy}" target="_blank"><i class="fa-solid fa-cart-shopping"></i></a></td>
            <td class="table-click-favorite smaller-th-td"><i class="fa-solid fa-star"></i></td>
            <td class="table-click-remove smaller-th-td"><i class="fa-solid fa-trash-can remove"></i></td>
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
            el.parentElement.parentElement.remove();
        } 
   }
}

/* STORAGE CLASS */


function isValidUrl (url)
{
    try {
        return !!new URL(url);
    } catch {
        return false;
    }
}


/* EVENTS */
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    /* ADDING BOOKS */
   
    document.querySelector("#book-form").addEventListener("submit", (e) => {

            e.preventDefault();

            /* GET INPUT VALUES */
            const title = document.querySelector('.title');
            const author = document.querySelector('.author');
            const isbn = document.querySelector('.isbn');
            const buy = document.querySelector('.buy');
            const nodeValues = [title.value, author.value, isbn.value, buy.value];
            const nodeLists = [title, author, isbn, buy];
            /* VALIDATING */
            nodeValues.forEach((element, index) => {
                
                if (element === "" || element === null)
                {
                    console.log(index);
                    nodeLists[index].classList.add("emptyInput");
                }  else
                {
                    nodeLists[index].classList.remove("emptyInput")
                }
            })
            if (title.value === "" || author.value === "" ||  isbn.value ==="" ||  buy.value === "")
            {
                const error = document.querySelector('p');
                error.setAttribute('class', 'error');
                error.innerHTML = `YOU NEED TO FILL ALL FIELDS!`
                setTimeout(() => {
                    error.innerHTML = ``;
                    error.removeAttribute('class', 'error');
                },3000 )
               
            } else if (isValidUrl(buy.value) === false)
            {
                const error = document.querySelector('p');
                error.setAttribute('class', error);
                error.innerHTML = `Your link is invalid!`;
                setTimeout(() => {
                    error.innerHTML = ``;
                    error.removeAttribute('class', 'error');
                },3000 )
            } else
            {
                const book = new Book(title.value, author.value, isbn.value, buy.value);
                const success = document.querySelector('p');
                success.setAttribute('class', 'success');
                success.innerHTML = `You have added your book!`;
                setTimeout(() => {
                    success.innerHTML = ``;
                    success.removeAttribute('class', 'success storaged');
                },3000 )
                UI.addBookToList(book);
                StorageBooks.storingData(book);
                UI.clearFields();
            }
        }
    )

    /* REMOVING BOOKS */
    document.querySelector(".book-lists").addEventListener('click', (e) => {
        UI.removeBooks(e.target);
        StorageBooks.removingData(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        console.log(e.target.parentElement.textContent)
    })
