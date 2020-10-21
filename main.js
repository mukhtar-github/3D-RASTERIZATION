import {square, doubleSquare, cube, pyramid} from './models.js';
import {drawPolygon} from './draw.js';
import {Camera} from './camera.js';
import {toMesh} from './mesh.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const scene = [
    toMesh(cube),
];

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 12;

context.strokeStyle = "#fff";

function drawMesh(mesh) {
    mesh.polygons.forEach(polygon => {
        const projectedPolygon = polygon.map(point => ({...point}));

        projectedPolygon.forEach(point => {
            mesh.transform(point);
           camera.transform(point);
        });
    
        drawPolygon(projectedPolygon, context);
    });
}

function animate(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    camera.pos.z += 0.1;

    scene.forEach(mesh => {
        mesh.rotation.y += 0.01;
        mesh.position.x = Math.sin(time / 300) * 80;
        mesh.position.y = Math.sin(time / 1000) * 80;
        drawMesh(mesh);
    });
    
    requestAnimationFrame(animate);
}

animate(0);
//drawMesh(mesh);