using Application.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappers
{
    public static class CommentMappers
    {
        public static CommentReadDto ToReadDto(this Comment comment)
        {
            return new CommentReadDto(
                comment.Id,
                comment.Text,
                comment.CreatedAt,
                comment.ProductId,
                comment.UserId,
                comment.User?.UserName ?? "Unknown" 
            );
        }

        public static Comment ToEntity(this CommentCreateDto dto, Guid userId)
        {
            return new Comment
            {
                Text = dto.Text,
                ProductId = dto.ProductId,
                UserId = userId
            };
        }
    }
}
