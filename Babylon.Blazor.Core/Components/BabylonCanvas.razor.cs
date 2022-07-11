
using Babylon.Blazor.Core.Babylon;
using Microsoft.AspNetCore.Components;
using System.Dynamic;

namespace Babylon.Blazor.Core.Components
{
    public partial class BabylonCanvas
    {
        [Inject] public IBabylonFactory Babylon { get; set; }
        [Parameter] public string Id { get; set; } = "CsafdagSF";
        [Parameter] public string Class { get; set; } = "";
        [Parameter] public string Style { get; set; } = "";

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);

            if (firstRender)
            {
                //await JsRuntime.InvokeVoidAsync("babylonInterop.initCanvas", "babylon-canvas");

                //var canvasId = "babylon-canvas";
                var canvasId = Id;
                var engine = await Babylon.CreateEngine(canvasId, true);
                var scene = await Babylon.CreateScene(engine);
                var cameraTarget = await Babylon.CreateVector3(0, 0, 5);
                var camera = await Babylon.CreateArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, cameraTarget, scene, canvasId);
                var hemisphericLightDirection = await Babylon.CreateVector3(1, 1, 0);
                var light1 = await Babylon.CreateHemispehericLight("light1", hemisphericLightDirection, scene);
                //var pointLightDirection = await Babylon.CreateVector3(0, 1, -1);
                //var light2 = await Babylon.CreatePointLight("light2", pointLightDirection, scene);
                // 居然是动态？？
                //var sphereOptions = new ExpandoObject();
                //sphereOptions.TryAdd("diameter", 2);
                ////var sphere = await Babylon.CreateSphere("sphere", sphereOptions, scene);
                //var box = await Babylon.CreateBox("Box", 2, 3, 4);
                //box.
                await engine.RunRenderLoop(scene);
            }
        }

        public async Task cc()
        {
            Random random = new Random();
            for (int i = 0; i < 1000; i++)
            {
                var box = await Babylon.CreateBox("Box", random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5);
                StateHasChanged();
                await Task.Delay(10);
            }
        }
    }
}
