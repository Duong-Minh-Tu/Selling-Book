namespace APIBookSaling.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public int DiscountId { get; set; }
        // ten quyen sach
        public string BookName { get; set; }
        // tac gia
        public string Author { get; set; }
        // the loai sach
        public string TypeOfBook { get; set; }
        // gia quyen sach
        public float Price { get; set; }
        //code của sách
        public string BookCode { get; set; }
        public byte[] Image { get; set; }
        //public string Image { get; set; }
        public int? TotalLike { get; set; }
        public int? TotalSales { get; set; }
        public float? DiscountPercent { get; set; }
        public float? TotalStar { get; set; }
        // Danh mục
        public string Category { get; set; }
        // Công ty sản xuất 
        public string ProductCompany { get; set; }
        //  Ngày xuất bản
        public DateTime ReleaseDate { get; set; }
        // Dịch giả
        public string Translator { get; set; }
        // loại bìa
        public string CoverType { get; set; }
        // số trang
        public int NumberOfPage { get; set; }
        // Nhà xuất bản
        public string EditionCompany { get; set; }
        // mô tả
        public string Describe { get; set; }
    }
}
