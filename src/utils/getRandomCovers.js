export const getRandomCoverImages = (books, count = 10) => {
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(book => book.coverImageUrl);
  };
  