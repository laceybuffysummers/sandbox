namespace Company.Common.DataAnnotations.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class TypeExtensions
    {    
        public static bool IsPrimitive(this Type type)
        {
            return type.IsPrimitive || type.Namespace != null && type.Namespace.StartsWith("System");
        }

        public static Type GetGenericType(this Type type)
        {
            return type.GetElementType() ?? type.GetGenericArguments().FirstOrDefault();
        }

        public static bool IsPrimitiveGeneric(this Type type)
        {
            return type.IsGenericType &&
                   type.GetGenericTypeDefinition() == typeof(IEnumerable<>) &&
                   type.GetGenericType().IsPrimitive();
        }
    }
}