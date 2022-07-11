using Microsoft.JSInterop;

namespace Babylon.Blazor.Core.Babylon
{
    public class HemisphericLight : BabylonObject
    {
        public HemisphericLight(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }
    }
}
