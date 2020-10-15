import { square, doubleSquare } from './models.js';
import { drawPolygon } from './draw.js';
import { Camera } from './camera';

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

const camera = new Camera();

context.strokeStyle = "#fff";
mesh.forEach(polygon => {
    polygon.forEach(point => {
       camera.transform(point);
    });

    drawPolygon(polygon, context);
});
console.log(mesh);