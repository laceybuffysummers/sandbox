namespace Company.Common.Web.Resources.Statistics
{
    public class StatisticsItemResource<TData>
    {
        public StatisticsItemResource()
        {            
        }

        public StatisticsItemResource(
            string label,
            TData data)
        {
            this.Label = label;
            this.Data = data;
        }

        public string Label { get; set; }

        public TData Data { get; set; }
    }
}