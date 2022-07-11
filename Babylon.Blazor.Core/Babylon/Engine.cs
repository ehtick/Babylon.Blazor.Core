using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Babylon.Blazor.Core.Babylon
{
    public class Engine : BabylonObject
    {
        public Engine(IJSRuntime jsRuntime, JsRuntimeObjectRef objRef) : base(jsRuntime, objRef) { }

        public async Task RunRenderLoop(Scene scene)
        {
            await _jsObjRef.JSRuntime.InvokeVoidAsync("babylonInterop.runRenderLoop", this, scene);
        }
    }
}
