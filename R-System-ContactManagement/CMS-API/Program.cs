using CMS_API.GlobalExceptions;
using CMS_API.data;
using CMS_API.Services;
using CMS_API.data.interfaces;
using CMS_API.services.interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()  // Allow any origin
              .AllowAnyHeader()  // Allow any header
              .AllowAnyMethod(); // Allow any method (GET, POST, PUT, DELETE, etc.)
    });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Register services

builder.Services.AddSingleton<IDataService>(_ => new JsonFileService(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data\\contacts.json")));
builder.Services.AddTransient<IContactService, ContactService>();

var app = builder.Build();

// Register Custom Exception Middleware
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
