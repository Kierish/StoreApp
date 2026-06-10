using Application.DTOs.Products;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ApiControllerBase<TagController>
    {
        private readonly ITagService _service;

        public TagController(ITagService service, ILogger<TagController> logger)
            : base(logger)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves a list of all available tags.
        /// </summary>
        /// <returns>A list of tag read data transfer objects.</returns>
        /// <response code="200">Successfully retrieved the tags.</response>
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<TagReadDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TagReadDto>>> GetTags()
        {
            var result = await _service.GetAllTagsAsync();

            if (!result.IsSuccess)
            {
                return HandleFailure(result);
            }

            return Ok(result.Data);
        }
    }
}
