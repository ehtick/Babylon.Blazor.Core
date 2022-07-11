using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class Box : BabylonObject
    {
        public Box(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }

    }
}
