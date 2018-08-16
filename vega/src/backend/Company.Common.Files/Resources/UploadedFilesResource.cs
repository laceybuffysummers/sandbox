namespace Company.Common.Files.Resources
{
    using System.Collections.Generic;

    public sealed class UploadedFilesResource
    {
        public UploadedFilesResource()
        {
        }

        public UploadedFilesResource(
            IEnumerable<UploadedItemResource> items)
        {
            this.Items = items;
        }

        public IEnumerable<UploadedItemResource> Items { get; set; }
    }
}