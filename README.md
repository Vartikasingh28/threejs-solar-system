# Solar System Simulation (Three.js)

## 🌍 Live Demo
https://solar-system-b923ab.netlify.app/

## 📂 Project Overview
This is a 3D **solar system simulation** built using **Three.js**. The planets rotate on their axes and revolve around the sun with realistic orbits.

## 🛠 Technologies Used
- **Three.js** (for 3D rendering)
- **JavaScript (ES6+)**
- **HTML & CSS** (for structuring & styling)
- **OrbitControls.js** (for interactive controls)

## 🏃‍♂️ How to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/solar-system-threejs.git
   ```
2. Navigate to the project folder:
   ```bash
   cd solar-system-threejs
   ```
3. Open `index.html` in your browser **or** run a local server (recommended for texture loading issues):
   ```bash
   npx serve   # If you have Node.js installed
   ```
   Then open [http://localhost:5000](http://localhost:5000) (or the provided link).

## 🪐 How the Solar System Works
### 1️⃣ **Planetary Motion**
Each planet follows a **circular orbit** using trigonometric functions:
   ```js
   const x = Math.cos(angle) * distance;
   const z = Math.sin(angle) * distance;
   planet.position.set(x, 0, z);
   ```
   The `angle` increases over time, simulating revolution.

### 2️⃣ **Rotations**
Planets rotate on their axes by incrementing their `rotateY` value in the animation loop:
   ```js
   planet.rotateY(0.02); // Rotates at a fixed speed
   ```

### 3️⃣ **Lighting & Textures**
- The **sun emits light**, illuminating the planets.
- Textures are applied using `MeshStandardMaterial` for realism.

### 4️⃣ **Moon Orbit**
The moon orbits Earth with a smaller revolution radius:
   ```js
   moon.position.set(earthX + Math.cos(moonAngle) * 8, 0, earthZ + Math.sin(moonAngle) * 8);
   ```

## 🛠 Challenges & Solutions
### 🔴 **Planets Not Showing**
**Issue:** Planets were invisible due to incorrect lighting.
✅ **Fix:** Added `PointLight` and `AmbientLight`.

### 🔴 **Textures Not Loading**
**Issue:** Some browsers blocked local textures.
✅ **Fix:** Used a local server (`npx serve`) to correctly load images.

### 🔴 **Smooth Orbits & Rotations**
**Issue:** Planets didn’t orbit smoothly.
✅ **Fix:** Used `Math.sin()` and `Math.cos()` for smooth transitions.

## 🚀 Future Enhancements
- 🏷️ **Labels for planets** using `CSS2DRenderer`.
- ☄️ **Asteroid belt** between Mars & Jupiter.
- 🌌 **Better skybox** for a more immersive experience.
