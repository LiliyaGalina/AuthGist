using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthGist.SettingsModels
{
    public class AzureAdOptions
    {

        public string ClientId { get; set; }
        public string CallbackPath { get; set; }
        public string Instance { get; set; }
        public string Domain { get; set; }
        public string TenantId { get; set; }
        public string Scope { get; set; }
        public string ScopeDescription { get; set; }

    }
}
