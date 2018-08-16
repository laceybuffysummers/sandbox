namespace Company.Common.Files.Models
{
    using System.Collections.Generic;

    public sealed class UploadFiles
    {
        public UploadFiles(
            IEnumerable<UploadItem> items)
        {
            this.Items = items;
        }

        public IEnumerable<UploadItem> Items { get; }
    }
}