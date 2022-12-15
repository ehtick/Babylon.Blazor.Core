var babylonInterop = babylonInterop || {};

babylonInterop.objRefs = {};
babylonInterop.objRefId = 0;
babylonInterop.objRefKey = '__jsObjRefId';
babylonInterop.storeObjRef = function (obj) {
    var id = babylonInterop.objRefId++;
    babylonInterop.objRefs[id] = obj;
    var objRef = {};
    objRef[babylonInterop.objRefKey] = id;
    return objRef;
}
babylonInterop.removeObjectRef = function (id) {
    delete babylonInterop.objRefs[id];
}

DotNet.attachReviver(function (key, value) {
    if (value &&
        typeof value === 'object' &&
        value.hasOwnProperty(babylonInterop.objRefKey) &&
        typeof value[babylonInterop.objRefKey] === 'number') {
        var id = value[babylonInterop.objRefKey];
        if (!(id in babylonInterop.objRefs)) {
            throw new Error("The JS object reference doesn't exist: " + id);
        }
        const instance = babylonInterop.objRefs[id];
        return instance;
    } else {
        return value;
    }
});


babylonInterop.initCanvas = function (canvasId) {
    var babylonCanvas = document.getElementById(canvasId);
    var babylonEngine = new BABYLON.Engine(babylonCanvas, true);
    var scene = babylonInterop.createSceneWithSphere(babylonEngine, babylonCanvas);

    babylonEngine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        babylonEngine.resize();
    });
};

babylonInterop.createSceneWithSphere = function (engine, canvas) {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
    camera.attachControl(canvas, true);
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

    return scene;
};

babylonInterop.createArcRotateCamera = function (name, alpha, beta, radius, target, scene, canvasId) {
    var camera = new BABYLON.ArcRotateCamera(name, alpha, beta, radius, target, scene);
    var canvas = document.getElementById(canvasId);
    camera.attachControl(canvas, true);
    //camera.upperBetaLimit = 180;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 45;
    camera.upVector = new BABYLON.Vector3(0, 0, 1);
    return babylonInterop.storeObjRef(camera);
}

babylonInterop.createEngine = function (canvasId, antialias) {
    var babylonCanvas = document.getElementById(canvasId);
    var babylonEngine = new BABYLON.Engine(babylonCanvas, antialias);
    window.addEventListener("resize", function () {
        babylonEngine.resize();
    });
    return babylonInterop.storeObjRef(babylonEngine);
}

babylonInterop.createHemisphericLight = function (name, direction, scene) {
    return babylonInterop.storeObjRef(new BABYLON.HemisphericLight(name, direction, scene));
}

babylonInterop.createPointLight = function (name, direction, scene) {
    return babylonInterop.storeObjRef(new BABYLON.PointLight(name, direction, scene));
}

babylonInterop.createScene = function (engine) {
    var scene = babylonInterop.storeObjRef(new BABYLON.Scene(engine));
    //showAxis(6, scene);
    scene.useRightHandedSystem = true;
    return scene;
}

babylonInterop.createSphere = function (name, options, scene) {
    return babylonInterop.storeObjRef(BABYLON.MeshBuilder.CreateSphere(name, options, scene));
}

babylonInterop.createVector3 = function (x, y, z) {
    return babylonInterop.storeObjRef(new BABYLON.Vector3(x, y, z));
}

babylonInterop.createBox = function (scene, name, width, height, depth, x, y, z, rx, ry, rz, r, g, b) {
    const faceColors = [];
    faceColors[0] = BABYLON.Color3.FromInts(r, g, b);
    faceColors[1] = BABYLON.Color3.FromInts(r, g, b);
    faceColors[2] = BABYLON.Color3.FromInts(r, g, b);
    faceColors[3] = BABYLON.Color3.FromInts(r, g, b);
    faceColors[4] = BABYLON.Color3.FromInts(r, g, b);
    faceColors[5] = BABYLON.Color3.FromInts(r, g, b);
    ////faceColors[0] = BABYLON.Color3.
    //faceColors[1] = BABYLON.Color3.Yellow()
    //faceColors[2] = BABYLON.Color3.Yellow();
    //faceColors[3] = BABYLON.Color3.Yellow();
    //faceColors[4] = BABYLON.Color3.Yellow();
    //faceColors[5] = BABYLON.Color3.Yellow();
    //faceColors[0] = BABYLON.Color3.

    var box = new BABYLON.MeshBuilder.CreateBox(name, 
        { faceColors: faceColors, width: width, height: height, depth: depth }, scene)
    box.position.x = x;
    box.position.y = y;
    box.position.z = z;
    box.rotation.x = rx;
    box.rotation.y = ry;
    box.rotation.z = rz;
    // const axisY = BABYLON.Mesh.CreateLines("axisY", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 6, 0), new BABYLON.Vector3(-0.05 * 6, 6 * 0.95, 0),
    //     new BABYLON.Vector3(0, 6, 0), new BABYLON.Vector3(0.05 * 6, 6 * 0.95, 0)
    // ]);
    return babylonInterop.storeObjRef(box);


}

babylonInterop.disposeObj = function (obj) {
    obj.dispose();
}

babylonInterop.runRenderLoop = function (engine, scene) {
    engine.runRenderLoop(function () {
        scene.render();
    });
}

/***********Create and Draw Axes**************************************/
babylonInterop.showAxes = function (scene, size) {
    // const makeTextPlane = (text, color, size) => {
    //     const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    //     dynamicTexture.hasAlpha = true;
    //     dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
    //     const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    //     plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    //     plane.material.backFaceCulling = false;
    //     plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    //     plane.material.diffuseTexture = dynamicTexture;
    //     return plane;
    // };

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    // const xChar = makeTextPlane("X", "red", size / 10);
    // xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    // const yChar = makeTextPlane("Y", "green", size / 10);
    // yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};

/*********************************************************************/

/*******************************Local Axes****************************/
localAxes = (size, scene) => {
    const local_axisX = BABYLON.Mesh.CreateLines("local_axisX", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    local_axisX.color = new BABYLON.Color3(1, 0, 0);

    local_axisY = BABYLON.Mesh.CreateLines("local_axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ], scene);
    local_axisY.color = new BABYLON.Color3(0, 1, 0);

    const local_axisZ = BABYLON.Mesh.CreateLines("local_axisZ", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ], scene);
    local_axisZ.color = new BABYLON.Color3(0, 0, 1);

    const local_origin = new BABYLON.TransformNode("local_origin");

    local_axisX.parent = local_origin;
    local_axisY.parent = local_origin;
    local_axisZ.parent = local_origin;

    return local_origin;
}
/*******************************End Local Axes****************************/