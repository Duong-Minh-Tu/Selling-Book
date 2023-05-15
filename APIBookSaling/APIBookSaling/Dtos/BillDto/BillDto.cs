using APIBookSaling.Dtos.BillDto.BillDetailDto;
using APIBookSaling.Dtos.BooksDto;
using APIBookSaling.Entities;

namespace APIBookSaling.Dtos.BillDto
{
    public class BillDto
    {
        public float TotalPrice { get; set; }
        public List<BillDetailsDto> billDetails { get; set; }
    }
}
