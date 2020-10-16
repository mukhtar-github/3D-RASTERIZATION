import {square, doubleSquare, cube} from './models.js';
import {drawPolygon} from './draw.js';
import {Camera} from './camera.js';

function toPoint(values) {
    return {
        x: values[0],
        y: values[1],
        z: values[2]
    };
}

function toPolygon(shape) {
    return shape.map(toPoint);
}

function toMesh(shape) {
    return shape.map(toPolygon);
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const mesh = toMesh(cube);
const position= {x: 0, y: 0, z: 0};

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 12;

context.strokeStyle = "#fff";

function offset(point, position) {
    point.x += position.x;
    point.y += position.y;
    point.z += position.z;
}

function drawMesh(mesh) {
    mesh.forEach(polygon => {
        const projectedPolygon = polygon.map(point => ({...point}));

        projectedPolygon.forEach(point => {
            offset(point, position);
           camera.transform(point);
        });
    
        drawPolygon(projectedPolygon, context);
    });
}

function animate(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    position.x =Math.sin(time / 300) * 80;
    position.y =Math.sin(time / 1000) * 80;
    camera.pos.z += 0.1;
    drawMesh(mesh);
    requestAnimationFrame(animate);
}

animate(0);
//drawMesh(mesh);