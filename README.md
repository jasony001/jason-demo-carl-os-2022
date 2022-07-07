## webapi project

1. add packages
    - EntityFramworkCore, ...Design, ..SqlServer, BriceLam...Pluralizer
2. scaffold
   `dotnet ef DBContext scaffold Name=OSDemoDB Microsoft.EntityFrameworkCore.SqlServer -o DBModels`

-   [optional] upgrade dotnet ef: `dotnet tool update --global dotnet-ef`

3. Create Model classes
    - clone DBModel classes, remove circular references
4. hook up dbcontext - in progra.cs
   ``` 
   using Microsoft.EntityFrameworkCore - builder.Services.AddDbContext<os_demo_api_net6.DBModels.osdemodbContext>(options =>
   {
   options.UseSqlServer(builder.Configuration.GetConnectionString("OSDemoDB"));
   });
    builder.Services.AddCors();
    builder.Services.AddControllers();
    ...
    app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials

    app.UseAuthorization();
    ...
    ```
* in firefox, use https webapi url. do not use http, it gives a misleading cors error
