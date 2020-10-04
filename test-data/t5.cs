using System;
using System.Collections.Generic;

namespace Microsoft.AspNetCore.Mvc.Routing
{
    internal /*asdf*/ class ConsumesMetadata : IConsumesMetadata
    {
        /* multi-line comment
        that ends here */ public string a { get; set; }
        public ConsumesMetadata(string[] contentTypes)
        {/*
            aaaaaa *//**/
            if (contentTypes == null)
            {
                throw new ArgumentNullException(nameof(contentTypes));
            }

            ContentTypes = contentTypes;
        }

        public IReadOnlyList<string> ContentTypes { get; }
    }
}