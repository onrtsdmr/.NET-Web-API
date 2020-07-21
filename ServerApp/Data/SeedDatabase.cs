using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Identity;

using ServerApp.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ServerApp.Data {
    public static class SeedDatabase {
        public static async Task Seed (UserManager<User> userManager) {
            if (!userManager.Users.Any ()) 
            {
                var users = File.ReadAllText("Data/users.json");
                var listOfUsers = JsonConvert.DeserializeObject<List<User>>(users);

                foreach (var user in listOfUsers)
                {
                    await userManager.CreateAsync(user, "onur123123");
                }
            }
        }
    }
}
