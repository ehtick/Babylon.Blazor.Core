using System.Dynamic;
using System.Threading.Tasks;

namespace Babylon.Blazor.Core.Babylon
{
    public interface IBabylonFactory
    {
        Task<ArcRotateCamera> CreateArcRotateCamera(string name, double alpha, double beta, double radius, Vector3 target, Scene scene, string canvasId);
        Task<Engine> CreateEngine(string canvasId, bool antialias = false);
        Task<HemisphericLight> CreateHemispehericLight(string name, Vector3 direction, Scene scene);
        Task<PointLight> CreatePointLight(string name, Vector3 direction, Scene scene);
        Task<Scene> CreateScene(Engine engine);
        Task<Mesh> CreateSphere(string name, ExpandoObject options, Scene scene);
        Task<Vector3> CreateVector3(double x, double y, double z);
        Task<Box> CreateBox(string name, double width = 1, double height = 1, double depth = 1, double x = 0, double y = 0, double z = 0);
    }
}