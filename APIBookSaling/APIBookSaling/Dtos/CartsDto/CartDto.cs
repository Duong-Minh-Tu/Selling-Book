using APIBookSaling.Dtos.BooksDto;
using APIBookSaling.Entities;

namespace APIBookSaling.Dtos.CartsDto
{
    public class CartDto
    {
        public int IdUser { get; set; }
        public List<Book> IdBook { get; set; }
    }
}
