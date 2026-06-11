using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ErrorMessages
{
    public static class CommentErrors
    {
        public static Error CommentNotFound(Guid id) =>
            Error.NotFound("Comment.NotFound", $"The comment with ID {id} was not found.");

        public static Error CommentDeleteForbidden() =>
            Error.Forbidden("Comment.Forbidden", "You do not have permission to delete this comment.");
    }
}
