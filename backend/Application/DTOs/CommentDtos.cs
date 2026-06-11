using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    /// <summary>
    /// Represents a comment (opinion) returned by the API.
    /// </summary>
    /// <param name="Id">The unique identifier of the comment.</param>
    /// <param name="Text">The actual content/text of the comment.</param>
    /// <param name="CreatedAt">The UTC date and time when the comment was posted.</param>
    /// <param name="ProductId">The unique identifier of the product being commented on.</param>
    /// <param name="UserId">The unique identifier of the user who authored the comment.</param>
    /// <param name="UserName">The display name of the comment's author.</param>
    public record CommentReadDto(
        Guid Id,
        string Text,
        DateTime CreatedAt,
        Guid ProductId,
        Guid UserId,
        string UserName 
    );

    /// <summary>
    /// Contains the data required to create a new comment.
    /// </summary>
    /// <param name="Text">The content of the new comment (must be between 3 and 1000 characters).</param>
    /// <param name="ProductId">The unique identifier of the target product.</param>
    public record CommentCreateDto(
        string Text,
        Guid ProductId
    );
}
