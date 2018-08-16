namespace Company.Common.Services.Models.Statistics
{
    public class IntStatisticsItem : StatisticsItem<int>
    {
        public IntStatisticsItem(string label, int data)
            : base(label, data)
        {
        }
    }
}