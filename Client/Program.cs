using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Client
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var oktaConfig = new OktaConfig
            {
                ClientId = "0oa1e8chdky5XgT8g357",
                ClientSecret = "Ed6pz00HBylbhKjbw1wN3pmkZznGZMxrQFLPlfhK",
                TokenUrl = "https://dev-660868.okta.com/oauth2/default/v1/token"
            };

            var tokenService = new TokenService(oktaConfig);
            var token = await tokenService.GetToken();

            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var query = @"
{
  author(id: 1) {
    name
  }
}";

            var postData = new { Query = query };
            var stringContent = new StringContent(JsonConvert.SerializeObject(postData), Encoding.UTF8, "application/json");

            var res = await httpClient.PostAsync("https://localhost:44358/graphql", stringContent);
            if (res.IsSuccessStatusCode)
            {
                var content = await res.Content.ReadAsStringAsync();

                Console.WriteLine(content);
            }
            else
            {
                Console.WriteLine($"Error occurred... Status code:{res.StatusCode}");
            }
        }
    }
}
