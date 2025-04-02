export const selectBooks = (state) => state.books.books;

// Селектор для получения выбранного жанра
export const selectSelectedGenre = (state) => state.books.selectedGenre;

// Селектор для получения фильтрованных книг по жанру
export const selectBooksByGenre = (state) => {
  const selectedGenre = state.books.selectedGenre;
  if (selectedGenre === null) {
    // Если жанр не выбран, возвращаем все книги
    return state.books.books;
  }
  // Фильтруем книги по выбранному жанру
  return state.books.books.filter((book) => book.genre === selectedGenre);
};