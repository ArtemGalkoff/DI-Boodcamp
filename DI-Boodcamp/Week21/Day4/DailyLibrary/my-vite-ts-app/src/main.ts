interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string;
}

class Library {

  protected books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | null {
    const book = this.books.find(b => b.isbn === isbn);
    return book || null;
  }
}

class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super();  
    this.website = website;
  }

  public listBooks(): string[] {
    return this.books.map(book => book.title);
  }
}

const myDigitalLibrary = new DigitalLibrary("https://www.mydigitallibrary.com");

myDigitalLibrary.addBook({
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J.K. Rowling",
  isbn: "978-0439708180",
  publishedYear: 1997,
  genre: "Fantasy",
});

myDigitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0451524935",
  publishedYear: 1949,
});

myDigitalLibrary.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  isbn: "978-0061120084",
  publishedYear: 1960,
  genre: "Fiction",
});

console.log(myDigitalLibrary.listBooks());

const bookDetails = myDigitalLibrary.getBookDetails("978-0439708180");
console.log(bookDetails);