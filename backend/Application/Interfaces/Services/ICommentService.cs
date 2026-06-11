using Application.DTOs;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ICommentService
    {
        Task<Result<IEnumerable<CommentReadDto>>> GetProductCommentsAsync(Guid productId);
        Task<Result<CommentReadDto>> CreateCommentAsync(Guid userId, CommentCreateDto dto);
        Task<Result<bool>> DeleteCommentAsync(Guid commentId, Guid currentUserId, string currentUserRole);
    }
}
