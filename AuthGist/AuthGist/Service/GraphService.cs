using AuthGist.SettingsModels;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AuthGist.Service
{
    public class GraphService
    {

        GraphServiceClient _graphClient;
        string clientSecret = "";

        public GraphService(IOptions<AzureAdOptions> azureOptions)
        {
            var options = azureOptions.Value;

            // The app registration should be configured to require access to permissions
            // sufficient for the Microsoft Graph API calls the app will be making, and
            // those permissions should be granted by a tenant administrator.
            var scopes = new string[] { "https://graph.microsoft.com/.default" };

            // Configure the MSAL client as a confidential client
            var confidentialClient = ConfidentialClientApplicationBuilder
                .Create(options.ClientId)
                .WithAuthority($"https://login.microsoftonline.com/{options.TenantId}/v2.0")
                .WithClientSecret(clientSecret)
                .Build();

            // Build the Microsoft Graph client. As the authentication provider, set an async lambda
            // which uses the MSAL client to obtain an app-only access token to Microsoft Graph,
            // and inserts this access token in the Authorization header of each API request. 
            _graphClient =
                new GraphServiceClient(new DelegateAuthenticationProvider(async (requestMessage) =>
                {

                    // Retrieve an access token for Microsoft Graph (gets a fresh token if needed).
                    var authResult = await confidentialClient
                        .AcquireTokenForClient(scopes)
                        .ExecuteAsync();

                    // Add the access token in the Authorization header of the API request.
                    requestMessage.Headers.Authorization =
                        new AuthenticationHeaderValue("Bearer", authResult.AccessToken);
                })
                );
        }

        public async Task<IEnumerable<object>> ListUsers()
        {
            var users = await _graphClient.Users.Request().GetAsync();
            return users;
        }

    }
}
