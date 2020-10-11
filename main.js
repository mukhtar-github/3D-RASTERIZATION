import { square, doubleSquare } from './models.js';
import { drawPolygon } from './draw.js';

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

const mesh = toMesh(doubleSquare);

function perspective(point, distance) {
    const fov = point.z + distance;
    point.x /= fov;
    point.y /= fov;
}

function zoom(point, factor) {
    const scale = Math.pow(factor, 2);
    point.x *= scale;
    point.y *= scale;
}

context.strokeStyle = "#fff";
mesh.forEach(polygon => {
    polygon.forEach(point => {
        perspective(point, 2);
        zoom(point, 8)
    });

    drawPolygon(polygon, context);
});

console.log(mesh);