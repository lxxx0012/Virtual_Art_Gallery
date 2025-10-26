A dynamic 3D scene built with Babylon.js that loads and displays multiple .glb models with interactive camera 
controls and visibility toggling. Ideal for showcasing assets or building a modular viewer for games, simulations, 
or product demos.

🚀 Features
- 🎥 ArcRotateCamera with zoom limits for intuitive navigation
- 💡 Hemispheric lighting for ambient illumination
- 📦 Loads multiple .glb models from local or remote sources
- 👁️ Toggle visibility of individual models via showModel() function
- 📐 Organized layout with models positioned across the scene
- 🔄 Responsive rendering loop and window resize handling
  
📁 Project Structure
/project-root
│
├── index.html          # HTML container with <canvas id="renderCanvas">
├── viewer.js           # Babylon.js scene setup and model loader
├── /images             # Local .glb models (e.g., futuristic_soldier.glb)
└── README.md           # Project documentation


🧠 How It Works
- Initializes a Babylon.js engine and scene
- Sets up an ArcRotateCamera centered on the origin
- Loads models using BABYLON.SceneLoader.ImportMesh
- Positions each model at a unique X-axis offset
- Stores loaded meshes in a dictionary for easy access
- Enables/disables models using window.showModel(modelName)
  
🧪 Usage
- Include Babylon.js in your HTML:
<script src="https://cdn.babylonjs.com/babylon.js"></script>
- Add a canvas element:
<canvas id="renderCanvas"></canvas>
- Link your viewer.js script:
<script src="viewer.js"></script>
- Call showModel('modelName.glb') from the browser console or UI button to toggle visibility.
  
🌐 Example Models
- futuristic_soldier.glb
- mythcreature.glb
- megatron.glb
- uberpod.glb
- https://models.babylonjs.com/boombox.glb
  
🛠️ Requirements
- Babylon.js CDN or local build
- .glb models stored in /images or accessible via URL
- Modern browser with WebGL support
  
📌 Notes
- Ensure CORS is enabled for remote model URLs
- Local models must be served via a web server (e.g., Live Server, Python HTTP server)
