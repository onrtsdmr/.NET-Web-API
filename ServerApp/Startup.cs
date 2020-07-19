using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

using ServerApp.Data;
using ServerApp.Models;

namespace ServerApp {
    public class Startup {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddCors (options => {
                options.AddPolicy (name: MyAllowSpecificOrigins,
                    builder => {
                        builder
                            .WithOrigins ("http://localhost:4200")
                            .AllowAnyHeader ()
                            .AllowAnyMethod ();
                        // .AllowAnyHeader ()
                        // .AllowAnyMethod ()
                        // .AllowCredentials()
                        // .AllowAnyOrigin (); // tüm requestleri karşılar
                        // builder.WithOrigins ("http://localhost:5000",
                        //     "http://localhost:5001");
                        // WithMethods("GET") and WithHeader()
                    });
            });

            services.AddDbContext<SocialContext> (x => x.UseMySql (@"server=localhost;port=3306;database=SocialDB;user=root;password=onur123123"));
            services.AddIdentity<User, Role> ().AddEntityFrameworkStores<SocialContext> ();
            services.Configure<IdentityOptions> (
                options => {
                    options.Password.RequireDigit = true;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes (5);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    options.Lockout.AllowedForNewUsers = true;

                    // options.User.AllowedUserNameCharacters = "";
                    options.User.RequireUniqueEmail = true;

                }
            );
            services.AddControllers ().AddNewtonsoftJson ();
            services.AddAuthentication (x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Secret").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            // app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseCors (MyAllowSpecificOrigins);

            app.UseAuthentication ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}
