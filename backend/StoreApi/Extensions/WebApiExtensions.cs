using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using StoreApi.Infrastructure.Exceptions;
using StoreApi.Infrastructure.Filters;
using StoreApi.Infrastructure.Swagger;
using System.Globalization;
using System.Reflection;
using System.Threading.RateLimiting;

namespace StoreApi.Extensions
{
    public static class WebApiExtensions
    {
        public static IServiceCollection AddWebServices(
            this IServiceCollection services, 
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            // Culture Settings
            var cultureInfo = new CultureInfo("en-US");
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

            // Exception Handling
            services.AddProblemDetails();
            services.AddExceptionHandler<GlobalExceptionHandler>();

            // Health Checks
            var sqlConnectionString = configuration.GetConnectionString("DefaultConnection")!;
            var redisConnectionString = configuration.GetConnectionString("Redis")!;

            services.AddHealthChecks()
                .AddCheck("self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy(), tags: ["live"])
                .AddSqlServer(sqlConnectionString, tags: ["ready"])
                .AddRedis(redisConnectionString, tags: ["ready"]);

            // CORS
            services.AddCors(options =>
            {
                options.AddPolicy(
                    "AllowReactApp",
                    policy =>
                    {
                        policy
                            .SetIsOriginAllowed(origin =>
                            {
                                if (string.IsNullOrWhiteSpace(origin))
                                    return false;

                                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                                    return false;

                                if (environment.IsDevelopment() 
                                    && uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase))
                                    return true;

                                if (uri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase))
                                {
                                    var host = uri.Host;

                                    if (host.Equals("kierish-store.vercel.app", StringComparison.OrdinalIgnoreCase))
                                        return true;

                                    if (host.EndsWith("-kierish.vercel.app", StringComparison.OrdinalIgnoreCase))
                                        return true;
                                }

                                return false;
                            })
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithExposedHeaders("X-Pagination");
                    }
                );
            });

            // Controllers & Validation
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            services.AddControllers(options =>
            {
                options.Filters.Add<GlobalValidationFilter>();
            });

            // Swagger
            services.AddFluentValidationRulesToSwagger();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Title = "Store Management API",
                        Version = "v1",
                        Description = "A production-grade REST API for store management.",
                    }
                );

                options.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        Scheme = "Bearer",
                        BearerFormat = "JWT",
                        In = ParameterLocation.Header,
                        Description = "Enter your JWT token.",
                    }
                );

                options.OperationFilter<AuthOperationFilter>();
                options.OperationFilter<GlobalResponsesOperationFilter>();

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });

            // Rate Limiting Configuration
            services.AddRateLimiter(options =>
            {
                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

                options.OnRejected = async (context, ct) =>
                {
                    context.HttpContext.Response.ContentType = "application/problem+json";
                    await context.HttpContext.Response.WriteAsJsonAsync(new
                    {
                        type = "https://httpstatuses.com/429",
                        title = "Too Many Requests",
                        status = StatusCodes.Status429TooManyRequests,
                        detail = "You have exceeded your request rate limit. Please wait before trying again."
                    }, ct);
                };

                options.AddPolicy("general-limiter", context =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        context.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
                        _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 60,
                            Window = TimeSpan.FromMinutes(1),
                            QueueLimit = 0 
                        }));

                options.AddPolicy("auth-limiter", context =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        context.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
                        _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 5,
                            Window = TimeSpan.FromMinutes(1),
                            QueueLimit = 0
                        }));
            });

            return services;
        }
    }
}
