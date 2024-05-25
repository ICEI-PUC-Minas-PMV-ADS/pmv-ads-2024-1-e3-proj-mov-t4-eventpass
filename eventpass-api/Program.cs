using EventPass.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
});
builder.Services.AddHealthChecks();
builder.Services.AddDbContext<EventPass.Models.AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("EventPassDatabase")));
builder.Services.AddScoped<EventosService>();
builder.Services.AddScoped<UsuariosService>();
builder.Services.AddScoped<StorageService>();
builder.Services.AddScoped<IngressosService>();
builder.Services.AddScoped<EmailService>();
//Jwt configuration starts here
var jwtIssuer = builder.Configuration.GetSection("ApplicationSettings:Issuer").Get<string>();
var jwtKey = builder.Configuration.GetSection("ApplicationSettings:JwtSecret").Get<string>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidateLifetime = true,
         ValidateIssuerSigningKey = true,
         ValidIssuer = jwtIssuer,
         ValidAudience = jwtIssuer,
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
     };
 });
//Jwt configuration ends here

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsStaging() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseHealthChecks("/health");

app.Run();
