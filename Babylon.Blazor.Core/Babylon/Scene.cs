using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class Scene : BabylonObject
    {
        public Scene(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }
    }
}
