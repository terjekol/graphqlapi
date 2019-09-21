﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api.Database;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();
            using (IServiceScope scope = host.Services.CreateScope())
            {
                ApplicationDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                var authorDbEntry = context.Authors.Add(
                    new Author
                    {
                        Name = "First Author",
                    }
                );

                context.SaveChanges();

                context.Books.AddRange(
                    new Book
                    {
                        Name = "First Book",
                        Published = true,
                        AuthorId = authorDbEntry.Entity.Id,
                        Genre = "Mystery"
                    },
                    new Book
                    {
                        Name = "Second Book",
                        Published = true,
                        AuthorId = authorDbEntry.Entity.Id,
                        Genre = "Crime"
                    }
                );
            }
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
