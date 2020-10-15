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

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 12;

context.strokeStyle = "#fff";

function drawMesh(mesh) {
    mesh.forEach(polygon => {
        polygon.forEach(point => {
           camera.transform(point);
        });
    
        drawPolygon(polygon, context);
    });
}

console.log(mesh);