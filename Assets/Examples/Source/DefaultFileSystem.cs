using System;
using QuickJS.Utils;
using System.Net;
using System.IO;
using System.Text;

namespace Example
{
    /// <summary>
    /// a simple demonstration of accessing remote file (sync)
    /// </summary>
    public class HttpFileSystem : IFileSystem
    {
        private string _url;

        public HttpFileSystem(string baseUrl)
        {
            _url = baseUrl;
        }

        private string GetRemote(string path)
        {
            try
            {
                var uri = _url.EndsWith("/") ? _url + path : $"{_url}/{path}";
                var request = WebRequest.CreateHttp(uri);
                var response = request.GetResponse() as HttpWebResponse;
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var reader = new StreamReader(response.GetResponseStream());
                    return reader.ReadToEnd();
                }
            }
            catch (Exception)
            {
            }
            return null;
        }

        public bool Exists(string path)
        {
            if (!path.EndsWith(".js") && !path.EndsWith(".json") && !path.EndsWith(".jsonc"))
            {
                return false;
            }
            var asset = GetRemote(path);
            return asset != null;
        }

        public string GetFullPath(string path)
        {
            return path;
        }

        public byte[] ReadAllBytes(string path)
        {
            try
            {
                var asset = GetRemote(path);
                return Encoding.UTF8.GetBytes(asset);
            }
            catch (Exception exception)
            {
                QuickJS.Diagnostics.Logger.IO.Error("{0}: {1}\n{2}", path, exception.Message, exception.StackTrace);
                return null;
            }
        }
    }
}
