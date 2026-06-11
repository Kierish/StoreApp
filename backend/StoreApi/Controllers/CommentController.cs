using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ApiControllerBase<CommentController>
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service, ILogger<CommentController> logger)
            : base(logger)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves a list of comments for a specific product.
        /// </summary>
        /// <param name="productId">The unique identifier of the product.</param>
        /// <returns>A list of comments sorted from newest to oldest.</returns>
        /// <response code="200">Successfully retrieved the list of comments.</response>
        [HttpGet("product/{productId}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<CommentReadDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetComments(Guid productId)
        {
            var result = await _service.GetProductCommentsAsync(productId);
            if (!result.IsSuccess) return HandleFailure(result);
            return Ok(result.Data);
        }

        /// <summary>
        /// Adds a new comment to a specific product.
        /// </summary>
        /// <param name="dto">The comment data containing the text and target product ID.</param>
        /// <returns>The newly created comment.</returns>
        /// <response code="201">The comment was successfully created.</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(CommentReadDto), StatusCodes.Status201Created)]
        public async Task<ActionResult<CommentReadDto>> AddComment([FromBody] CommentCreateDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized();

            var result = await _service.CreateCommentAsync(userId, dto);
            if (!result.IsSuccess) return HandleFailure(result);

            return CreatedAtAction(nameof(GetComments), new { productId = dto.ProductId }, result.Data);
        }

        /// <summary>
        /// Deletes a specific comment. Only the author or staff members (Admin/Employee) can perform this action.
        /// </summary>
        /// <param name="id">The unique identifier of the comment to delete.</param>
        /// <response code="204">The comment was successfully deleted.</response>
        /// <response code="404">The requested comment was not found.</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role) ?? "";

            if (!Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized();

            var result = await _service.DeleteCommentAsync(id, userId, role);
            if (!result.IsSuccess) return HandleFailure(result);

            return NoContent();
        }
    }
}
