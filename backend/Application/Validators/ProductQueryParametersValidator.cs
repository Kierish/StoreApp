using Application.Pagination;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public class ProductQueryParametersValidator : AbstractValidator<ProductQueryParameters>
    {
        public ProductQueryParametersValidator()
        {
            Include(new PageParametersValidator());

            RuleFor(x => x.MinPrice)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Minimum price cannot be negative.")
                .When(x => x.MinPrice.HasValue);

            RuleFor(x => x.MaxPrice)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Maximum price cannot be negative.")
                .When(x => x.MaxPrice.HasValue);

            RuleFor(x => x.MinPrice)
                .LessThanOrEqualTo(x => x.MaxPrice!.Value)
                .WithMessage("Minimum price cannot be greater than maximum price.")
                .When(x => x.MinPrice.HasValue && x.MaxPrice.HasValue);
        }
    }
}
