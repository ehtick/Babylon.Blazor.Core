
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

        public Scene Scene;
        public Engine Engine;
        public async Task Reset()
        {
            var canvasId = Id;
            Engine = await Babylon.CreateEngine(canvasId, true);
            Scene = await Babylon.CreateScene(Engine);
            var cameraTarget = await Babylon.CreateVector3(0, 0, 0);
            var camera = await Babylon.CreateArcRotateCamera("Camera", -Math.PI / 2.2, Math.PI / 2.5, 10, cameraTarget, Scene, canvasId);
            var hemisphericLightDirection = await Babylon.CreateVector3(1, 1, 1);
            var hemisphericLightDirection1 = await Babylon.CreateVector3(-1, -1, -1);
            var light1 = await Babylon.CreateHemispehericLight("light1", hemisphericLightDirection, Scene);
            var light2 = await Babylon.CreateHemispehericLight("light2", hemisphericLightDirection1, Scene);
            await Babylon.SetSkyBox(Scene, 0.8, g: 0.8, 0.8);

            await Engine.RunRenderLoop(Scene);
            await Babylon.ShowAxes(Scene, 20);
        }


        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);

            if (firstRender)
            {
                //await JsRuntime.InvokeVoidAsync("babylonInterop.initCanvas", "babylon-canvas");

                //var canvasId = "babylon-canvas";
                var canvasId = Id;
                Engine = await Babylon.CreateEngine(canvasId, true);
                Scene = await Babylon.CreateScene(Engine);
                var cameraTarget = await Babylon.CreateVector3(0, 0, 2);
                var camera = await Babylon.CreateArcRotateCamera("Camera",  -Math.PI / 2.2, Math.PI / 2.5, 10, cameraTarget, Scene, canvasId);
                var hemisphericLightDirection = await Babylon.CreateVector3(1, 1, 1);
                var hemisphericLightDirection1 = await Babylon.CreateVector3(-1, -1, -1);
                var light1 = await Babylon.CreateHemispehericLight("light1", hemisphericLightDirection, Scene);
                var light2 = await Babylon.CreateHemispehericLight("light2", hemisphericLightDirection1, Scene);
                await Babylon.SetSkyBox(Scene, 0.8, g: 0.8, 0.8);
                //var pointLightDirection = await Babylon.CreateVector3(0, 1, -1);
                //var light2 = await Babylon.CreatePointLight("light2", pointLightDirection, scene);
                // 居然是动态？？
                //var sphereOptions = new ExpandoObject();
                //sphereOptions.TryAdd("diameter", 2);
                ////var sphere = await Babylon.CreateSphere("sphere", sphereOptions, scene);
                //var box = await Babylon.CreateBox("Box", 2, 3, 4);
                //box.
                await Engine.RunRenderLoop(Scene);
                await Babylon.ShowAxes(Scene, 20);

            }

        }

        public async Task cc()
        {
            Random random = new Random();
            for (int i = 0; i < 1000; i++)
            {
                // var box = await Babylon.CreateBox("Box", random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5, random.NextDouble() * 5);
                StateHasChanged();
                await Task.Delay(10);
            }
        }
    }
}
