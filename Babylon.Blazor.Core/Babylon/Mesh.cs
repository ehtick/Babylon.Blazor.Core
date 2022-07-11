using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class Mesh : BabylonObject
    {
        public Mesh(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }
    }
}
