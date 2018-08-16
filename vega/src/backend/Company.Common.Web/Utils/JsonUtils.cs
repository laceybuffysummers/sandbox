namespace Company.Common.Web.Utils
{
    using System.IO;

    using Newtonsoft.Json;

    internal static class JsonUtils
    {
        internal static void WriteAsJsonToStream(
            this object obj,
            Stream stream)
        {
            using (var writer = new StreamWriter(stream))
            using (var jsonWriter = new JsonTextWriter(writer))
            {
                var ser = new JsonSerializer();
                ser.Serialize(jsonWriter, obj);

                jsonWriter.Flush();
            }
        }

        internal static void WriteAsJson(
            this Stream stream,
            object obj)
        {
            using (var writer = new StreamWriter(stream))
            using (var jsonWriter = new JsonTextWriter(writer))
            {
                var ser = new JsonSerializer();
                ser.Serialize(jsonWriter, obj);

                jsonWriter.Flush();
            }
        }
    }
}