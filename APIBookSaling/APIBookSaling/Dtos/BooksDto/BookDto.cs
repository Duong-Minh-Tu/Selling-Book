using APIBookSaling.Entities;

namespace APIBookSaling.Dtos.BooksDto
{
    public class BookDto
    {
        public int Id { get; set; }

        // ten quyen sach
        private string _bookName;
        public string BookName
        {
            get => _bookName;
            set => _bookName = value?.Trim();
        }

        // tac gia
        private string _author;
        public string Author
        {
            get => _author;
            set => _author = value?.Trim();
        }
        // the loai sach
        public string TypeOfBook { get; set; }
        // gia quyen sach
        public float Price { get; set; }
        //code của sách
        public string BookCode { get; set; }
        public byte[] Image { get; set; }
        //public string Image { get; set; }
        public float? DiscountPercent { get; set; }
        public float? TotalStar { get; set; }
        public int? TotalLike { get; set; }
        public int? TotalSales { get; set; }

        // Danh mục
        private string _category;
        public string Category { get => _category; set => _category = value?.Trim(); }

        // Công ty sản xuất 
        private string _productCompany;
        public string ProductCompany { get => _productCompany; set => _productCompany = value?.Trim(); }

        //  Ngày xuất bản
        public DateTime ReleaseDate { get; set; }

        // Dịch giả
        private string _translator;
        public string Translator { get => _translator; set => _translator = value?.Trim(); }

        // loại bìa
        private string _coverType;
        public string CoverType { get => _coverType; set => _coverType = value?.Trim(); }
        // số trang
        public int NumberOfPage { get; set; }

        // Nhà xuất bản
        private string _editionCompany;
        public string EditionCompany { get => _editionCompany; set => _editionCompany = value?.Trim(); }

        // mô tả
        private string _describe;
        public string Describe { get => _describe; set => _describe = value?.Trim(); }
    }
}
