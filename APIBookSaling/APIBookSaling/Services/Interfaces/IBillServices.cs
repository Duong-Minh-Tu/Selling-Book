using APIBookSaling.Dtos.BillDto;
using APIBookSaling.Dtos.BillDto.BillDetailDto;
using APIBookSaling.Dtos.CartsDto;
using APIBookSaling.Dtos.Discounts;
using APIBookSaling.Entities;
using APIBookSaling.Page;

namespace APIBookSaling.Services.Interfaces
{
    public interface IBillServices
    {
        void CreateBill(List<int> ListIdBook, string name, int payment, int delivery, int addressId);
        Bill FindById(int id);
        int Deleted(int id);
        void UpdateBill(CreateBillDto input, int id);
        PageResultDto<List<BillDto>> FindAll(FilterDto input);
        List<BillDto> Find(int Status);
        void Status(int idBill);
        void CreateDiscount(CreateDiscountDto input);
        void UpdateDiscount(UpdateDiscountDto input);
        void DiscounStatus(UpdateDiscountDto input);
    }
}
