using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace HttpTrggerFunction
{
    public static class EchoFunction
    {
        [FunctionName("echo")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var keyword = req.Query["keyword"];

            if (string.IsNullOrWhiteSpace(keyword))
            {
                return new BadRequestResult();
            }
            var myName = "Prudhvi";
            var responseMessage = $"{myName} says: {keyword}";

            return new OkObjectResult(responseMessage);
        }
    }
}
