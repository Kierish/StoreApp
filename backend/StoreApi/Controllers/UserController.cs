using Application.DTOs.Auth;
using Application.Interfaces.Services;
using Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = UserRoles.Admin)]
    public class UserController : ApiControllerBase<UserController>
    {
        private readonly IUserService _service;

        public UserController(IUserService service, ILogger<UserController> logger) : base(logger)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves a list of all registered users in the system.
        /// </summary>
        /// <returns>A list of user information with their current roles.</returns>
        /// <response code="200">Successfully retrieved the list of users.</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserReadDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetAllUsers()
        {
            var result = await _service.GetAllUsersAsync();
            if (!result.IsSuccess) return HandleFailure(result);
            return Ok(result.Data);
        }

        /// <summary>
        /// Updates the security role for a specific user.
        /// </summary>
        /// <param name="id">The unique identifier of the target user.</param>
        /// <param name="dto">The payload containing the new role.</param>
        /// <response code="204">The role was successfully updated.</response>
        /// <response code="404">The requested user was not found.</response>
        [HttpPut("{id}/role")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeRole(Guid id, [FromBody] ChangeRoleDto dto)
        {
            var result = await _service.ChangeUserRoleAsync(id, dto);
            if (!result.IsSuccess) return HandleFailure(result);
            return NoContent();
        }
    }
}
