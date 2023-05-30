using APIBookSaling.Dtos.BooksDto;
using APIBookSaling.Dtos.ReviewDto;
using APIBookSaling.Entities;
using APIBookSaling.Page;

namespace APIBookSaling.Services.Interfaces
{
    public interface IBookServices
    {
        BookDto CreateBook(FileUpLoad fileObj, BookDto input);
        BookDto FindById(int id);
        int Deleted(int id);
        void UpdateBook(CreateBookDto input, int id);
        PageResultDto<List<BookDto>> FindAll(FilterBookDto input);
        PageResultDto<List<BookDto>> FindAllBookUser(FilterBookDto input);
        byte[] GetImage(string sBase64String);
        //void CreateBook(CreateBookDto input);
        void Like(Like input);
        void Reviews(Review input, FileUpLoad fileObj, int DetailId);
        void ListImageBook(int IdBook, List<IFormFile> fileObj);
        /// <summary>
        /// tìm đánh giá của quyển sách
        /// </summary>
        /// <param name="idBook"></param>
        /// <returns></returns>
        List<ReviewsDto> FindAllReview(int idBook);
        List<Discount> FindAllDiscount();
        void Test();
    }
}
