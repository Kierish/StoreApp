using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Mappers;
using Application.Repositories;
using Domain.Constants;
using Domain.ErrorMessages;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repo;
        private readonly IProductRepository _productRepo;

        public CommentService(ICommentRepository repo, IProductRepository productRepo)
        {
            _repo = repo;
            _productRepo = productRepo;
        }

        public async Task<Result<IEnumerable<CommentReadDto>>> GetProductCommentsAsync(Guid productId)
        {
            var comments = await _repo.GetCommentsByProductIdAsync(productId);
            var dtos = comments.Select(c => c.ToReadDto());
            return Result<IEnumerable<CommentReadDto>>.Success(dtos);
        }

        public async Task<Result<CommentReadDto>> CreateCommentAsync(Guid userId, CommentCreateDto dto)
        {
            var product = await _productRepo.GetProductByIdAsync(dto.ProductId);
            if (product == null)
                return Result<CommentReadDto>.Failure(ProductErrors.ProductNotFound(dto.ProductId));

            var comment = dto.ToEntity(userId);
            _repo.AddComment(comment);
            await _repo.SaveChangesAsync();

            return Result<CommentReadDto>.Success(comment.ToReadDto());
        }

        public async Task<Result<bool>> DeleteCommentAsync(Guid commentId, Guid currentUserId, string currentUserRole)
        {
            var comment = await _repo.GetCommentByIdAsync(commentId);
            if (comment == null)
                return Result<bool>.Failure(CommentErrors.CommentNotFound(commentId)); 

            bool isAuthor = comment.UserId == currentUserId;
            bool isStaff = currentUserRole == UserRoles.Admin || currentUserRole == UserRoles.Employee;

            if (!isAuthor && !isStaff)
                return Result<bool>.Failure(CommentErrors.CommentDeleteForbidden());

            _repo.RemoveComment(comment);
            await _repo.SaveChangesAsync();

            return Result<bool>.Success(true);
        }
    }
}
