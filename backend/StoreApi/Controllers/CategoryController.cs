using Application.DTOs.Products;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ApiControllerBase<CategoryController>
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service, ILogger<CategoryController> logger)
            : base(logger)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves a list of all available categories.
        /// </summary>
        /// <returns>A list of category read data transfer objects.</returns>
        /// <response code="200">Successfully retrieved the categories.</response>
        [HttpGet]
        [AllowAnonymous] 
        [ProducesResponseType(typeof(IEnumerable<CategoryReadDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetCategories()
        {
            var result = await _service.GetAllCategoriesAsync();

            if (!result.IsSuccess)
            {
                return HandleFailure(result);
            }

            return Ok(result.Data);
        }
    }
}
