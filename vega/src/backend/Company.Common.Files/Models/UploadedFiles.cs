namespace Company.Common.Files.Models
{
    using System.Collections.Generic;

    public sealed class UploadedFiles
    {
        public UploadedFiles(
            IEnumerable<UploadedItem> items)
        {
            this.Items = items;
        }

        public IEnumerable<UploadedItem> Items { get; }
    }
}