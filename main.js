import { square } from './models.js';

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
    return square.map(toPolygon);
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const mesh = toMesh(square);

context.strokeStyle = "#fff";

mesh.forEach(polygon => {
    drawPolygon(polygon, context);
});

console.log(mesh);