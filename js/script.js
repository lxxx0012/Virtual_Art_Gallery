const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.upperRadiusLimit = 50;
    camera.lowerRadiusLimit = 5;

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    const loadedMeshes = {};

    const loadModel = (filePath, position) => {
        const isExternal = filePath.startsWith("http");
        const rootUrl = isExternal ? filePath.substring(0, filePath.lastIndexOf("/") + 1) : "./images/";
        const fileName = isExternal ? filePath.substring(filePath.lastIndexOf("/") + 1) : filePath;

        BABYLON.SceneLoader.ImportMesh(
            null,
            rootUrl,
            fileName,
            scene,
            function (meshes) {
                meshes.forEach(mesh => {
                    mesh.position = position;
                    mesh.setEnabled(false); // Hide all models initially
                });

                loadedMeshes[fileName] = meshes;

                // If it's the first model loaded, show it and activate its button
                if (Object.keys(loadedMeshes).length === 1) {
                    showModel(fileName);

                    const firstButton = document.querySelector(`button[data-model="${fileName}"]`);
                    if (firstButton) firstButton.classList.add('active');
                }
            },
            null,
            function (scene, message) {
                console.error(`Failed to load ${fileName}:`, message);
            }
        );
    };

    const showModel = function (modelName) {
        for (const key in loadedMeshes) {
            loadedMeshes[key].forEach(mesh => {
                mesh.setEnabled(key === modelName);
            });
        }
    };

    // Button click handling
    document.querySelectorAll('button[data-model]').forEach(button => {
        button.addEventListener('click', (e) => {
            const modelName = e.target.getAttribute('data-model');
            showModel(modelName);

            // Remove .active from all buttons
            document.querySelectorAll('button[data-model]').forEach(btn => btn.classList.remove('active'));

            // Add .active to the clicked button
            e.target.classList.add('active');
        });
    });

    // Load models
    loadModel("futuristic_soldier.glb", BABYLON.Vector3.Zero(0, 0, 0));
    loadModel("mythcreature.glb", BABYLON.Vector3.Zero(0, 5, 0));
    loadModel("megatron.glb", BABYLON.Vector3.Zero(0, 10, 0));
    loadModel("uberpod.glb", BABYLON.Vector3.Zero(0, 10, 0));
    loadModel("https://models.babylonjs.com/boombox.glb", BABYLON.Vector3.Zero());

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});
