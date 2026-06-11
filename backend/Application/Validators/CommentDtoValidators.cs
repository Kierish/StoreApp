using Application.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public class CommentCreateDtoValidator : AbstractValidator<CommentCreateDto>
    {
        public CommentCreateDtoValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Comment text cannot be empty.")
                .MinimumLength(3).WithMessage("Comment must be at least 3 characters long.")
                .MaximumLength(1000).WithMessage("Comment cannot exceed 1000 characters.");

            RuleFor(x => x.ProductId)
                .NotEmpty().WithMessage("Product ID is required.");
        }
    }
}
