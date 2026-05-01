document.addEventListener("DOMContentLoaded", () => {
    createStageFlash();
    initIntroFlow();
    initLocationButtons();
    initPointerGlow();
    initSceneDirector();
    createLightshow();
    createParticles();
    revealSections();
    initThreeJS();
});

function createStageFlash() {
    if (document.querySelector(".stage-flash")) return;

    const flash = document.createElement("div");
    flash.className = "stage-flash";
    flash.setAttribute("aria-hidden", "true");
    document.body.appendChild(flash);
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function currentPage() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
}

function initIntroFlow() {
    const page = currentPage();
    const reducedMotion = prefersReducedMotion();
    const flows = {
        "index.html": 1900,
        "page2.html": 1800,
        "page3.html": 2000,
        "page4.html": 1700
    };
    const next = {
        "index.html": "page2.html",
        "page2.html": "page3.html",
        "page3.html": "page4.html",
        "page4.html": "event-main.html"
    };

    if (!flows[page]) return;

    const delay = reducedMotion ? 800 : flows[page];
    window.setTimeout(() => goNext(next[page]), delay);
}

function goNext(url) {
    document.body.classList.add("stage-change");
    window.setTimeout(() => {
        document.body.classList.add("fade-out");
    }, prefersReducedMotion() ? 0 : 180);

    window.setTimeout(() => {
        window.location.href = url;
    }, prefersReducedMotion() ? 100 : 680);
}

function initLocationButtons() {
    const buttons = [
        document.getElementById("location-btn"),
        document.getElementById("location-btn-secondary")
    ].filter(Boolean);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            window.open("https://maps.google.com/?q=Playa+del+Ingles+Gran+Canaria", "_blank", "noopener");
        });
    });
}

function initPointerGlow() {
    window.addEventListener("pointermove", (event) => {
        document.body.style.setProperty("--x", `${event.clientX}px`);
        document.body.style.setProperty("--y", `${event.clientY}px`);
    }, { passive: true });
}

function initSceneDirector() {
    if (prefersReducedMotion()) return;

    const scenes = [
        {
            name: "sunset",
            palette: ["#ff2aa1", "#ff7a1a", "#00e5ff", "#ffde3d", "#7c3dff", "#39ff14"],
            bg: ["rgba(255, 222, 61, 0.8)", "rgba(255, 42, 161, 0.7)", "rgba(0, 229, 255, 0.46)", "#3a001c", "#9a2e00", "#00324a", "#18002f"]
        },
        {
            name: "wave",
            palette: ["#00e5ff", "#003cff", "#39ff14", "#ffffff", "#ff2aa1", "#ffde3d"],
            bg: ["rgba(0, 229, 255, 0.78)", "rgba(0, 255, 136, 0.56)", "rgba(255, 255, 255, 0.35)", "#001c36", "#00609a", "#280052", "#00131f"]
        },
        {
            name: "foam",
            palette: ["#ffffff", "#00fff0", "#ffde3d", "#ff2aa1", "#0066ff", "#39ff14"],
            bg: ["rgba(255, 255, 255, 0.66)", "rgba(0, 229, 255, 0.62)", "rgba(255, 42, 161, 0.42)", "#063247", "#2b1268", "#450020", "#001d33"]
        },
        {
            name: "fire",
            palette: ["#ff003c", "#ff7a1a", "#ffde3d", "#b100ff", "#00e5ff", "#39ff14"],
            bg: ["rgba(255, 0, 60, 0.86)", "rgba(255, 122, 26, 0.7)", "rgba(255, 222, 61, 0.38)", "#2c0009", "#670020", "#250056", "#140006"]
        },
        {
            name: "lagoon",
            palette: ["#39ff14", "#00ffea", "#00a3ff", "#ffde3d", "#7c3dff", "#ff2aa1"],
            bg: ["rgba(57, 255, 20, 0.68)", "rgba(0, 255, 240, 0.72)", "rgba(177, 0, 255, 0.38)", "#002f2b", "#00637f", "#370078", "#001d1b"]
        },
        {
            name: "neon",
            palette: ["#b100ff", "#ff00e6", "#00e5ff", "#d9ff00", "#ff003c", "#ff8c00"],
            bg: ["rgba(177, 0, 255, 0.74)", "rgba(255, 0, 230, 0.68)", "rgba(255, 234, 0, 0.52)", "#11002d", "#47008d", "#00305a", "#180018"]
        }
    ];
    let lastScene = "";

    function applyRandomScene() {
        const choices = scenes.filter((scene) => scene.name !== lastScene);
        const scene = choices[Math.floor(Math.random() * choices.length)];
        const palette = scene.palette;
        const root = document.documentElement.style;
        const flash = Math.floor(Math.random() * 4);

        root.setProperty("--hot", palette[0]);
        root.setProperty("--aqua", palette[1]);
        root.setProperty("--lime", palette[2]);
        root.setProperty("--sun", palette[3]);
        root.setProperty("--violet", palette[4]);
        root.setProperty("--orange", palette[5]);
        root.setProperty("--scene-a", scene.bg[0]);
        root.setProperty("--scene-b", scene.bg[1]);
        root.setProperty("--scene-c", scene.bg[2]);
        root.setProperty("--scene-bg1", scene.bg[3]);
        root.setProperty("--scene-bg2", scene.bg[4]);
        root.setProperty("--scene-bg3", scene.bg[5]);
        root.setProperty("--scene-bg4", scene.bg[6]);
        root.setProperty("--scene-angle", `${Math.floor(Math.random() * 360)}deg`);
        root.setProperty("--sun-x", `${4 + Math.random() * 24}%`);
        root.setProperty("--sun-y", `${5 + Math.random() * 22}%`);
        document.body.dataset.flash = String(flash);
        lastScene = scene.name;

        window.setTimeout(applyRandomScene, 760 + Math.random() * 980);
    }

    applyRandomScene();
}

function createLightshow() {
    const container = document.querySelector(".lightshow");
    if (!container || prefersReducedMotion()) return;

    const colors = [
        "rgba(255, 0, 60, 0.82)",
        "rgba(0, 229, 255, 0.82)",
        "rgba(57, 255, 20, 0.78)",
        "rgba(255, 222, 61, 0.82)",
        "rgba(255, 0, 230, 0.76)"
    ];

    for (let i = 0; i < 14; i += 1) {
        const beam = document.createElement("span");
        beam.className = "light-beam";
        beam.style.setProperty("--left", `${Math.random() * 100}%`);
        beam.style.setProperty("--beam-width", `${5 + Math.random() * 11}rem`);
        beam.style.setProperty("--beam-color", colors[i % colors.length]);
        beam.style.setProperty("--beam-speed", `${1.1 + Math.random() * 1.8}s`);
        beam.style.setProperty("--from-angle", `${-48 + Math.random() * 32}deg`);
        beam.style.setProperty("--to-angle", `${22 + Math.random() * 44}deg`);
        beam.style.animationDelay = `${Math.random() * -3}s`;
        container.appendChild(beam);
    }

    for (let i = 0; i < 10; i += 1) {
        const spot = document.createElement("span");
        spot.className = "light-spot";
        spot.style.setProperty("--left", `${Math.random() * 92}%`);
        spot.style.setProperty("--top", `${8 + Math.random() * 66}%`);
        spot.style.setProperty("--spot-size", `${9 + Math.random() * 18}rem`);
        spot.style.setProperty("--beam-color", colors[(i + 2) % colors.length]);
        spot.style.setProperty("--beam-speed", `${0.75 + Math.random() * 1.35}s`);
        spot.style.animationDelay = `${Math.random() * -2}s`;
        container.appendChild(spot);
    }
}

function createParticles() {
    const container = document.querySelector(".particles");
    if (!container || prefersReducedMotion()) return;

    const colors = ["#ff003c", "#00e5ff", "#39ff14", "#ffde3d", "#ff7a1a", "#7c3dff", "#ffffff", "#00fff0"];
    const clips = [
        "circle(50%)",
        "polygon(50% 0, 100% 100%, 0 100%)",
        "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        "polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    ];
    const count = window.innerWidth < 700 ? 38 : 78;

    for (let i = 0; i < count; i += 1) {
        const particle = document.createElement("span");
        const size = 7 + Math.random() * 24;
        const radius = Math.random() > 0.45 ? "50%" : "18%";

        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.setProperty("--size", `${size}px`);
        particle.style.setProperty("--radius", radius);
        particle.style.setProperty("--color", colors[i % colors.length]);
        particle.style.setProperty("--clip", clips[i % clips.length]);
        particle.style.setProperty("--duration", `${3.2 + Math.random() * 6.2}s`);
        particle.style.setProperty("--drift", `${-150 + Math.random() * 300}px`);
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }
}

function revealSections() {
    const sections = document.querySelectorAll(".feature-card, .timeline, .tickets, .location, .info-strip, .beach-zones");
    if (!sections.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
        sections.forEach((section) => section.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach((section) => observer.observe(section));
}

function initThreeJS() {
    const canvas = document.getElementById("threejs-canvas");
    if (!canvas || typeof THREE === "undefined" || prefersReducedMotion()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const group = new THREE.Group();
    const colors = [0xff003c, 0x00e5ff, 0x39ff14, 0xffde3d, 0x7c3dff, 0xff7a1a, 0xffffff];

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));

    const hotLight = new THREE.PointLight(0xff003c, 3.6, 24);
    const aquaLight = new THREE.PointLight(0x00e5ff, 3.3, 24);
    const acidLight = new THREE.PointLight(0x39ff14, 2.9, 22);
    hotLight.position.set(4, 4, 6);
    aquaLight.position.set(-4, -3, 6);
    acidLight.position.set(0, 4, 4);
    scene.add(hotLight, aquaLight, acidLight);

    for (let i = 0; i < 8; i += 1) {
        const geometry = i % 3 === 0
            ? new THREE.TorusGeometry(0.55 + i * 0.045, 0.08, 16, 48)
            : i % 3 === 1
                ? new THREE.IcosahedronGeometry(0.45 + i * 0.035, 0)
                : new THREE.OctahedronGeometry(0.44 + i * 0.025, 0);
        const material = new THREE.MeshStandardMaterial({
            color: colors[i % colors.length],
            emissive: colors[i % colors.length],
            emissiveIntensity: 0.62,
            metalness: 0.7,
            roughness: 0.14
        });
        const mesh = new THREE.Mesh(geometry, material);
        const angle = (Math.PI * 2 * i) / 8;
        const radiusX = 2.1 + Math.random() * 1.8;
        const radiusY = 1.2 + Math.random() * 1.3;

        mesh.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 2.05, -1.4 - i * 0.08);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = {
            angle,
            radiusX,
            radiusY,
            speed: 0.32 + Math.random() * 0.62,
            wobble: 0.8 + Math.random() * 2.2,
            phase: Math.random() * Math.PI * 2,
            mode: i % 4,
            driftX: -1.2 + Math.random() * 2.4,
            driftY: -0.9 + Math.random() * 1.8,
            spinX: 0.004 + Math.random() * 0.018,
            spinY: 0.004 + Math.random() * 0.02
        };
        group.add(mesh);
    }

    camera.position.z = 5.4;

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        group.rotation.y = time * 0.44;
        group.rotation.x = Math.sin(time * 1.1) * 0.2;
        group.rotation.z = Math.cos(time * 0.9) * 0.11;
        hotLight.position.x = Math.sin(time * 1.5) * 5.2;
        aquaLight.position.y = Math.cos(time * 1.6) * 4.1;
        acidLight.position.x = Math.cos(time * 1.35) * 3.8;
        acidLight.position.y = Math.sin(time * 1.45) * 3.8;

        group.children.forEach((mesh, index) => {
            const orbit = mesh.userData.angle + time * mesh.userData.speed;

            if (mesh.userData.mode === 0) {
                mesh.position.x = Math.cos(orbit) * mesh.userData.radiusX;
                mesh.position.y = Math.sin(orbit * mesh.userData.wobble + mesh.userData.phase) * mesh.userData.radiusY;
            } else if (mesh.userData.mode === 1) {
                mesh.position.x = Math.sin(time * mesh.userData.speed + mesh.userData.phase) * mesh.userData.radiusX + mesh.userData.driftX;
                mesh.position.y = Math.abs(Math.cos(time * mesh.userData.wobble + mesh.userData.phase)) * mesh.userData.radiusY - 0.8;
            } else if (mesh.userData.mode === 2) {
                const spiral = 1 + Math.sin(time * 0.9 + mesh.userData.phase) * 0.45;
                mesh.position.x = Math.cos(orbit * 1.7) * mesh.userData.radiusX * spiral;
                mesh.position.y = Math.sin(orbit * 0.7 + mesh.userData.phase) * mesh.userData.radiusY * spiral;
            } else {
                mesh.position.x = Math.sin(time * 0.7 + index) * mesh.userData.radiusX + Math.cos(time * 1.3 + mesh.userData.phase) * 0.8;
                mesh.position.y = Math.cos(time * mesh.userData.speed + index) * mesh.userData.radiusY + mesh.userData.driftY;
            }

            mesh.position.z = -1.1 - index * 0.1 + Math.sin(time * (0.7 + mesh.userData.speed) + mesh.userData.phase) * 0.55;

            if (Math.floor((time + mesh.userData.phase) * 2.1) % 2 === 0) {
                const color = colors[(Math.floor(time * 1.5) + index) % colors.length];
                mesh.material.color.setHex(color);
                mesh.material.emissive.setHex(color);
            }
            mesh.rotation.x += mesh.userData.spinX;
            mesh.rotation.y += mesh.userData.spinY;
            mesh.rotation.z += Math.sin(time + mesh.userData.phase) * 0.002;
            mesh.scale.setScalar(1 + Math.sin(time * (1.8 + mesh.userData.wobble) + index) * 0.14);
        });

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
