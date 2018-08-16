namespace Company.Common.Services.Models.Lists
{
    public class ModelItem
    {
        public ModelItem(
            string value, 
            string text)
        {
            this.Value = value;
            this.Text = text;
        }

        public string Value { get; }

        public string Text { get; }
    }
}