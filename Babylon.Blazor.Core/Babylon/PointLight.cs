using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class PointLight : BabylonObject
    {
        public PointLight(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }
    }
}
