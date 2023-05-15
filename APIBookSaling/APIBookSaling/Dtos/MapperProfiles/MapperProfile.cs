using APIBookSaling.Dtos.BillDto.BillDetailDto;
using APIBookSaling.Dtos.BooksDto;
using APIBookSaling.Dtos.ReviewDto;
using APIBookSaling.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace APIBookSaling.Dtos.MapperProfiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Book, BookDto>();
            CreateMap<Review, ReviewsDto>();
            CreateMap<BillDetail, BillDetailsDto>();
        }
    }
}
