using Application.DTOs.Products;
using FluentValidation;

namespace StoreApi.Validators.Products
{
    public class ProductCreateDtoValidator : AbstractValidator<ProductCreateDto>
    {
        public ProductCreateDtoValidator(IValidator<PageMetadataCreateDto> metadataValidator)
        {
            RuleFor(d => d.Name).NotEmpty().MinimumLength(3).MaximumLength(100);

            RuleFor(d => d.Price).NotNull().GreaterThan(0);

            RuleFor(d => d.PageMetadata)
                .SetValidator(metadataValidator!)
                .When(d => d.PageMetadata != null);
        }
    }

    public class ProductUpdateDtoValidator : AbstractValidator<ProductUpdateDto>
    {
        public ProductUpdateDtoValidator(IValidator<PageMetadataUpdateDto> metadataValidator)
        {
            RuleFor(d => d.Name).MinimumLength(3).MaximumLength(100).When(d => d.Name != null);

            RuleFor(d => d.Price).GreaterThan(0).When(d => d.Price != null);

            RuleFor(d => d.PageMetadata)
                .SetValidator(metadataValidator!)
                .When(d => d.PageMetadata != null);
        }
    }
}
