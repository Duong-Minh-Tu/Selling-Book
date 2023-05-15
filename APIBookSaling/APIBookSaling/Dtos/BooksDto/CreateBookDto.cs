namespace APIBookSaling.Dtos.BooksDto
{
    public class CreateBookDto
    {
        // ten quyen sach
        public string BookName { get; set; }
        // tac gia
        public string Author { get; set; }
        // the loai sach
        public string TypeOfBook { get; set; }
        // gia quyen sach
        public int Price { get; set; }
        public string BookCode { get; set; }
        //public byte[] Image { get; set; }
        public IFormFile Image { get; set; }
    }
}
