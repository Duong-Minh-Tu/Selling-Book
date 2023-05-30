using APIBookSaling.DbContexts;
using APIBookSaling.Dtos.BooksDto;
using APIBookSaling.Dtos.ReviewDto;
using APIBookSaling.Entities;
using APIBookSaling.Exceptions;
using APIBookSaling.Page;
using APIBookSaling.Services.Interfaces;
using APIBookSaling.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using System.Collections.Generic;
using System.Linq;

namespace APIBookSaling.Services.Implements
{
    public class BookServices : IBookServices
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContext;

        public BookServices(ILogger<BookServices> logger, 
            ApplicationDbContext dbContext, 
            IMapper mapper, 
            IConfiguration configuration, 
            IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpContext
            )
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            _httpContext = httpContext;
        }

        public BookDto CreateBook(FileUpLoad fileObj, BookDto input)
        {
            if (fileObj.file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    fileObj.file.CopyToAsync(ms);
                    byte[] fileBytes = ms.ToArray();

                    _dbContext.books.Add(new Book()
                    {
                        BookName = input.BookName,
                        Author = input.Author,
                        TypeOfBook = input.TypeOfBook,
                        BookCode = input.BookCode,
                        Price = input.Price,
                        DiscountPercent = input.DiscountPercent,
                        Image = fileBytes,
                        Category = input.Category,
                        ProductCompany = input.ProductCompany,
                        ReleaseDate= input.ReleaseDate,
                        Translator= input.Translator,
                        CoverType = input.CoverType,
                        NumberOfPage = input.NumberOfPage,
                        EditionCompany = input.EditionCompany,
                        Describe = input.Describe,
                    });
                }
            }
            _dbContext.SaveChanges();
            return input;
        }

        //public void CreateBook(CreateBookDto input)
        //{
        //    string pathImg = null;

        //    if (input.Image != null)
        //    {
        //        string path = _webHostEnvironment.WebRootPath + "\\uploads\\";
        //        if (!Directory.Exists(path))
        //        {
        //            Directory.CreateDirectory(path);
        //        }
        //        using (FileStream fileStream = File.Create(path + input.Image.FileName))
        //        {
        //            input.Image.CopyTo(fileStream);
        //            fileStream.Flush();
        //            pathImg = path + input.Image.FileName;
        //        }
        //    }

        //    _dbContext.books.Add(new Book()
        //    {
        //        BookName = input.BookName,
        //        Author = input.Author,
        //        TypeOfBook = input.TypeOfBook,
        //        BookCode = input.BookCode,
        //        Price = input.Price,
        //        Image = pathImg

        //    });
        //    _dbContext.SaveChanges();
        //}

        public BookDto FindById(int id)
        {
            var userid = CommonUtils.GetCurrentUserId(_httpContext);
            var bookQuery = _dbContext.books.AsQueryable();
            var bookFind = bookQuery.FirstOrDefault(s => s.Id == id);
            List<Review> review = new List<Review>();
            if (bookFind == null)
            {
                throw new UserFriendlyException("khong tim thay sach");
            }
            else if(bookFind != null)
            {
                var reviewFind = _dbContext.reviews.AsQueryable().Where(o => o.BookId == bookFind.Id).ToList();
                review = reviewFind;
            }
            var bookItem = _mapper.Map<BookDto>(bookFind);
            return bookItem;
        }

        public int Deleted(int id)
        {
            var bookQuery = _dbContext.books.AsQueryable();
            var bookFind = bookQuery.FirstOrDefault(s => s.Id == id);
            if (bookFind == null)
            {
                throw new UserFriendlyException("khong tim thay sach");
            }
            _dbContext.books.Remove(bookFind);
            _dbContext.SaveChanges();
            return 0;
        }

        public void UpdateBook(CreateBookDto input, int id)
        {
            var bookQuery = _dbContext.books.AsQueryable();
            var bookFind = bookQuery.FirstOrDefault(s => s.Id == id);
            if (bookFind == null)
            {
                throw new UserFriendlyException("khong tim thay sach");
            }
            // tạo lịch sử thay đổi giá
            if (bookFind.Price != input.Price)
            {
                _dbContext.historyPrices.Add(new HistoryPrice()
                {
                    Price = bookFind.Price,
                    BookId = bookFind.Id,
                    BookCode = bookFind.BookCode,
                });
            }
            bookFind.BookName = input.BookName;
            bookFind.Author = input.Author;
            bookFind.TypeOfBook = input.TypeOfBook;
            bookFind.Price = input.Price;
            _dbContext.SaveChanges();
        }

        public PageResultDto<List<BookDto>> FindAll(FilterBookDto input)
        {
            var bookQuery = _dbContext.books.AsQueryable();
            if (input.Keyword != null)
            {
                bookQuery = bookQuery.Where(s => s.BookName != null && s.BookName.Contains(input.Keyword));
            }

            var restul = new List<BookDto>();
            var numbers = new List<int?>();
            var countStar = 0;

            foreach (var item in bookQuery)
            {
                var ReviewQuery = _dbContext.reviews.AsQueryable().Where( o => o.Id == item.Id).ToList();
                foreach(var items in ReviewQuery)
                {
                    if (items != null)
                    {
                        int? sum = items.Star;
                        numbers.Add(sum);
                        countStar += 1;
                    }
                }

                var TotalSumm = (from x in numbers select x).Sum();
                float? averageStar = null;
                if (countStar != 0)
                {
                    averageStar = (TotalSumm / countStar);
                }
                else if (countStar == 0)
                {
                    averageStar = null;
                }

                restul.Add(new BookDto()
                {
                    Id = item.Id,
                    BookName = item.BookName,
                    Author = item.Author,
                    TypeOfBook = item.TypeOfBook,
                    Price = item.Price,
                    BookCode = item.BookCode,
                    Image = GetImage(Convert.ToBase64String(item.Image)),
                    TotalStar = averageStar,
                });
            }

            if(input.FiterPrice == null)
            {
                restul = restul;
            }else if(input.FiterPrice == 1) 
            {
                restul = restul.OrderBy(o => o.Price).ToList();
            }
            else if (input.FiterPrice == 2)
            {
                restul = restul.OrderByDescending(o => o.Price).ToList();
            }

            if(input.NewBook == null)
            {
                restul = restul;
            }
            else if(input.NewBook == 1)
            {
                restul = restul.OrderByDescending(o => o.Id).ToList();
            }

            if (input.TotalSell == null)
            {
                restul = restul;
            }
            else if (input.TotalSell == 1)
            {
                restul = restul.OrderByDescending(o => o.TotalSales).ToList();
            }

            if (input.PageSize == -1)
            {
                restul.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            }
            int totalItem = restul.Count();

            return new PageResultDto<List<BookDto>>
            {
                Item = restul,
                TotalItem = totalItem
            };
        }

        public PageResultDto<List<BookDto>> FindAllBookUser(FilterBookDto input)
        {
            var userid = CommonUtils.GetCurrentUserId(_httpContext);
            var bookQuery = _dbContext.books.AsQueryable();
            if (input.Keyword != null)
            {
                bookQuery = bookQuery.Where(s => s.BookName != null && s.BookName.Contains(input.Keyword));
            }
            int totalItem = bookQuery.Count();

            var restul = new List<BookDto>();
            var numbers = new List<int?>();
            var countStar = 0;
            foreach (var itemStart in bookQuery)
            {
                var ReviewQuery = _dbContext.reviews.AsQueryable().Where(o => o.Id == itemStart.Id).ToList();
                foreach (var items in ReviewQuery)
                {
                    if (items != null)
                    {
                        int? sum = items.Star;
                        numbers.Add(sum);
                        countStar += 1;
                    }
                }

                var TotalSumm = (from x in numbers select x).Sum();
                if (input.PageSize != -1)
                {
                    bookQuery = bookQuery.Skip(input.Skip).Take(input.PageSize);
                }
                else
                {
                    bookQuery = bookQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
                }
                float? averageStar = null;
                if (countStar != 0)
                {
                    averageStar = (TotalSumm / countStar);
                }
                else if (countStar == 0)
                {
                    averageStar = null;
                }

                foreach (var item in bookQuery)
                {
                    restul.Add(new BookDto()
                    {
                        Id = item.Id,
                        BookName = item.BookName,
                        Author = item.Author,
                        TypeOfBook = item.TypeOfBook,
                        Price = item.Price,
                        BookCode = item.BookCode,
                        Image = GetImage(Convert.ToBase64String(item.Image)),
                        TotalStar = averageStar,
                    });
                };
            }

            return new PageResultDto<List<BookDto>>
            {
                Item = restul,
                TotalItem = totalItem
            };
        }

        public void Like(Like input)
        {
            var userid = CommonUtils.GetCurrentUserId(_httpContext);
            var LikeFind = _dbContext.likes.FirstOrDefault(l => l.UserId == userid && l.BookId == input.BookId);
            var bookFind = _dbContext.books.FirstOrDefault(b => b.Id == LikeFind.BookId);
            if (LikeFind == null)
            {
                _dbContext.likes.Add(new Like()
                {
                    UserId = userid,
                    BookId = input.BookId,
                });
                bookFind.TotalLike += 1;
            }
            else if(LikeFind != null)
            {
                _dbContext.likes.Remove(LikeFind);
                bookFind.TotalLike -= 1;
            }
            _dbContext.SaveChanges();
        }

        public void ListImageBook(int IdBook, List<IFormFile> fileObj)
        { 
            foreach (var item in fileObj)
            {
                if (item.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        item.CopyToAsync(ms);
                        byte[] fileBytes = ms.ToArray();

                        _dbContext.listImageBooks.Add(new ListImageBook()
                        {
                            IdBook = IdBook,
                            Image = fileBytes,
                        }) ;
                    }
                }
            }
            _dbContext.SaveChanges();
        }

        //public void Reviews(Review input, List<IFormFile> fileObj)
        //{
        //    var userid = CommonUtils.GetCurrentUserId(_httpContext);
        //    var userName = CommonUtils.GetCurrentUsername(_httpContext);
        //    var review = _dbContext.reviews.Add(new Review()
        //    { 
        //        UserId = userid,
        //        BookId = input.BookId,
        //        Text = input.Text,
        //        Star = input.Star,
        //        CreateBy = userName,
        //        CreateDate = DateTime.Now,
        //    });
        //    _dbContext.SaveChanges();
        //    foreach (var item in fileObj)
        //    {
        //        if (item.Length > 0)
        //        {
        //            using (var ms = new MemoryStream())
        //            {
        //                item.CopyToAsync(ms);
        //                byte[] fileBytes = ms.ToArray();

        //                _dbContext.listImageReviews.Add(new ListImageReview()
        //                {
        //                    IdReview = review.Entity.Id,
        //                    Image = fileBytes
        //                });
        //            }
        //        }
        //    }
        //    _dbContext.SaveChanges();
        //}

        public void Reviews(Review input, FileUpLoad fileObj, int DetailId)
        {
            var userid = CommonUtils.GetCurrentUserId(_httpContext);
            var userName = CommonUtils.GetCurrentUsername(_httpContext);
            var billdetail = _dbContext.billDetails.FirstOrDefault(o => o.Id == DetailId);
            billdetail.IsReview = "Y";
            if (fileObj.file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    fileObj.file.CopyToAsync(ms);
                    byte[] fileBytes = ms.ToArray();
                    var review = _dbContext.reviews.Add(new Review()
                    {
                        UserId = userid,
                        BookId = input.BookId,
                        Text = input.Text,
                        Star = input.Star,
                        CreateBy = userName,
                        CreateDate = DateTime.Now,
                        Image = fileBytes
                    });
                }
            }
            _dbContext.SaveChanges();
        }

        public List<ReviewsDto> FindAllReview(int idBook)
        {
            List<ReviewsDto> reviews = new List<ReviewsDto>();
            var review = _dbContext.reviews.Where(s => s.BookId == idBook).ToList();
            foreach (var item in review)
            {
                var userName = _dbContext.users.FirstOrDefault(u => u.Id == item.UserId);
                var items = _mapper.Map<ReviewsDto>(item);
                items.Image = GetImage(Convert.ToBase64String(item.Image));
                items.CustomerName = userName.CustomerName;
                items.Image = GetImage(Convert.ToBase64String(item.Image));
                items.ImageUser = userName.Image;
                reviews.Add(items);
            }
            return reviews;
        }

        public byte[] GetImage(string sBase64String)
        {
            byte[] bytes = null;
            if (!string.IsNullOrEmpty(sBase64String))
            {
                bytes = Convert.FromBase64String(sBase64String);
            }
            return bytes;
        }

        public List<Discount> FindAllDiscount()
        {
            var cartDetailQuery = _dbContext.discounts.AsQueryable().Where(o => o.Active == "Y").ToList();
            return cartDetailQuery;
        }

        public void Test()
        {

        }
    }
}
