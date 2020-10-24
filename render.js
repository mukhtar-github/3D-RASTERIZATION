export function createRenderer(canvas) {
    const context = canvas.getContext('2d');
    
    return function render(scene, camera) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        scene.forEach(mesh => {
            drawMesh(mesh, camera, context);
        });
    }
}

function drawMesh(mesh, camera, context) {
    context.strokeStyle = mesh.color;
    mesh.polygons.forEach(polygon => {
        const projectedPolygon = polygon.map(point => ({...point}));

        projectedPolygon.forEach(point => {
            mesh.transform(point);
           camera.transform(point);
        });
    
        drawPolygon(projectedPolygon, context);
    });
}
