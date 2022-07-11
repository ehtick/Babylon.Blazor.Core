using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class ArcRotateCamera : BabylonObject
    {
        public ArcRotateCamera(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }
    }
}
