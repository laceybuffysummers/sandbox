namespace Company.Common.Web.Resources.Lists
{
    public class ModelItemResource
    {
        public ModelItemResource()
        {            
        }

        public ModelItemResource(
            string value,
            string text)
        {
            this.Value = value;
            this.Text = text;
        }

        public string Value { get; set; }

        public string Text { get; set; }
    }
}