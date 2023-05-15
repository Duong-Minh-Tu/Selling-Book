using APIBookSaling.Dtos.BillDto;
using APIBookSaling.Dtos.BillDto.BillDetailDto;
using APIBookSaling.Entities;
using APIBookSaling.Page;

namespace APIBookSaling.Services.Interfaces
{
    public interface IBillDetailServices
    {
        BillDetail FindById(int id);
        int Deleted(int id);
        void UpdateBillDetail(CreateBillDetailDto input, int id);
        PageResultDto<List<BillDetail>> FindAll(FilterDto input);
    }
}
