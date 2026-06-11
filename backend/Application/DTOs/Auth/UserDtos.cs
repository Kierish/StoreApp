using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Auth
{
    /// <summary>
    /// Represents a user returned by the API.
    /// </summary>
    /// <param name="Id">The unique identifier of the user.</param>
    /// <param name="UserName">The display name of the user.</param>
    /// <param name="Email">The email address of the user.</param>
    /// <param name="Role">The current role of the user (e.g., Customer, Employee, Admin).</param>
    public record UserReadDto(Guid Id, string UserName, string Email, string Role);

    /// <summary>
    /// Contains the data required to change a user's role.
    /// </summary>
    /// <param name="NewRole">The new role to assign to the user. Must be Admin, Employee, or Customer.</param>
    public record ChangeRoleDto(string NewRole);
}
