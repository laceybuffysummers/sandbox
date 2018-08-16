namespace Company.Common.Services.Models.Statistics
{
    public class StatisticsItem<TData>
    {
        public StatisticsItem(
            string label, 
            TData data)
        {
            this.Label = label;
            this.Data = data;
        }

        public string Label { get; }

        public TData Data { get; }
    }
}