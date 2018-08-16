namespace Company.Common.Services.Specifications
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.String;

    public sealed class SortField<T> : IEnumerable<Expression<Func<T, object>>>
    {
        public SortField(
            string sortBy, 
            List<Expression<Func<T, object>>> expressions)
        {
            this.SortBy = sortBy;
            this.Expressions = expressions;
        }

        [NotNullOrEmpty]
        public string SortBy { get; }

        public List<Expression<Func<T, object>>> Expressions { get; }

        public void Add(Expression<Func<T, object>> expression)
        {
            this.Expressions.Add(expression);
        }

        public IEnumerator<Expression<Func<T, object>>> GetEnumerator()
        {
            return this.Expressions.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}