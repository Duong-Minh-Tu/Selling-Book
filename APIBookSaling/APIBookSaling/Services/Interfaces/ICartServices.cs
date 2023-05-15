using APIBookSaling.Dtos.CartsDto;
using APIBookSaling.Entities;
using APIBookSaling.Page;

namespace APIBookSaling.Services.Interfaces
{
    public interface ICartServices
    {
        Cart Find();
        int Deleted(int id);
        void UpdateCart(List<ListBookCart> add);
        int DeletedItemCart(List<int> listIdBook);

    }
}
