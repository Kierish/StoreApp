using Application.DTOs.Auth;
using Domain.Constants;
using FluentValidation;

namespace StoreApi.Validators.Auth
{
    public class LoginDataDtoValidator : AbstractValidator<LoginDataDto>
    {
        public LoginDataDtoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);

            RuleFor(x => x.Password).NotEmpty().MinimumLength(8).MaximumLength(100);
        }
    }

    public class RegisterDataDtoValidator : AbstractValidator<RegisterDataDto>
    {
        public RegisterDataDtoValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().MinimumLength(3).MaximumLength(100);

            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);

            RuleFor(x => x.PhoneNumber).NotEmpty().MaximumLength(20);

            RuleFor(x => x.Password).NotEmpty().MinimumLength(8).MaximumLength(100);
        }
    }

    public class ChangeRoleDtoValidator : AbstractValidator<ChangeRoleDto>
    {
        public ChangeRoleDtoValidator()
        {
            RuleFor(x => x.NewRole)
                .NotEmpty().WithMessage("Role cannot be empty.")
                .Must(BeAValidRole).WithMessage($"Role must be one of: {UserRoles.Admin}, {UserRoles.Employee}, {UserRoles.Customer}");
        }

        private bool BeAValidRole(string role)
        {
            return role == UserRoles.Admin ||
                   role == UserRoles.Employee ||
                   role == UserRoles.Customer;
        }
    }
}
