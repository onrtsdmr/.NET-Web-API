using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Helper {
    public static class ProductDTOHelper {
        public static ProductDTO ProductToDTO (Product p) {
            return new ProductDTO () {
                ProductId = p.ProductId,
                Name = p.Name,
                Price = p.Price,
                IsApproved = p.IsApproved
            };
        }
    }
}
