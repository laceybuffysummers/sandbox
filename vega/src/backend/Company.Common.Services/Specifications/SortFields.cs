namespace Company.Common.Services.Specifications
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;

    public sealed class SortFields<T>: IEnumerable<SortField<T>>
    {
        private readonly List<SortField<T>> sortFields = new List<SortField<T>>();

        public void Add(string sortBy, params Expression<Func<T, object>>[] expressions)
        {
            var field = this[sortBy];
            if (field == null)
            {
                this.sortFields.Add(new SortField<T>(sortBy, expressions.ToList()));
            }
            else
            {
                field.Expressions.AddRange(expressions);
            }
        }

        public bool HasField(string sortBy)
        {
            var sort = sortBy.Trim().ToLower();
            return this.sortFields.Any(f => f.SortBy.Trim().ToLower() == sort);
        }

        public SortField<T> this[string key]
        {
            get
            {
                var k = key.Trim().ToLower();
                return this.sortFields.FirstOrDefault(f => f.SortBy.Trim().Trim() == k);
            }
        }

        public IEnumerator<SortField<T>> GetEnumerator()
        {
            return this.sortFields.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}