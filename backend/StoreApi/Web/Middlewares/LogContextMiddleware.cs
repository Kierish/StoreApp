using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Serilog.Context;

namespace StoreApi.Infrastructure.Middlewares
{
    public class LogContextMiddleware
    {
        private readonly RequestDelegate _next;

        public LogContextMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var userId = context.User.FindFirst(JwtRegisteredClaimNames.NameId)?.Value
                      ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                      ?? "anonymous";

            using (LogContext.PushProperty("UserId", userId))
            {
                await _next(context);
            }
        }
    }
}
