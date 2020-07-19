using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.Helper;
using ServerApp.Models;

namespace ServerApp.Controllers {
    // localhost:5001/api/products
    [Authorize]
    [ApiController]
    [Route ("api/[controller]")]
    public class ProductsController : ControllerBase {

        private readonly SocialContext _context;

        public ProductsController (SocialContext context) {
            this._context = context;
        }

        // localhost:5001/api/products
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetProducts () {
            try {
                var products = await _context
                    .Products
                    .Select (p => ProductDTOHelper.ProductToDTO (p))
                    .ToListAsync ();
                return Ok (products);
            } catch (System.Exception) {

                return BadRequest ();
            }
        }
        // localhost:5001/api/products/{id}
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetProductById (int id) {
            var p = await _context
                .Products
                .FindAsync(id);

            if (p == null) {
                return NotFound ();
            }

            return Ok (ProductDTOHelper.ProductToDTO(p));
        }

        // localhost:5001/api/products
        [HttpPost]
        public async Task<IActionResult> CreateProduct (Product entity) {
            try {
                _context.Products.Add (entity);
                await _context.SaveChangesAsync ();
                foreach (var item in _context.Products) {
                    System.Console.WriteLine (item.Name);
                }
                return CreatedAtAction (nameof (GetProductById), new { id = entity.ProductId }, ProductDTOHelper.ProductToDTO (entity));
            } catch (System.Exception) {
                return BadRequest (entity);
            }
        }

        //localhost/api/products/{id}
        [HttpPut ("{id}")]
        public async Task<IActionResult> UpdateProduct (int id, Product entitiy) {
            if (id != entitiy.ProductId) {
                return BadRequest ();
            }

            var product = await _context.Products.FindAsync (id);

            if (product == null) return NotFound ();

            product.Name = entitiy.Name;
            product.Price = entitiy.Price;
            product.IsApproved = entitiy.IsApproved;

            try {
                await _context.SaveChangesAsync ();
            } catch (System.Exception) {

                return NotFound ();
            }

            return NoContent ();
        }

        // localhost:5001/api/products/{id}
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteProduct (int id) {
            var product = await _context.Products.FindAsync (id);

            if (product == null) return BadRequest ();

            _context.Products.Remove (product);
            await _context.SaveChangesAsync ();

            return NoContent ();
        }

        // You can also add the id parameter in the body section.
        // localhost:5001/api/products
        // [HttpDelete()]
        // public async Task<IActionResult> DeleteProduct(int id){
        //     var product = await _context.Products.FindAsync(id);

        //     if(product == null) return BadRequest();

        //     _context.Products.Remove(product);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }
    }
}
