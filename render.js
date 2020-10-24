export function createRenderer(canvas) {
    const context = canvas.getContext('2d');
    
    return function render(scene, camera) {
        scene.forEach(mesh => {
            drawMesh(mesh, context);
        });
    }
}

function drawMesh(mesh, context) {
    mesh.polygons.forEach(polygon => {
        const projectedPolygon = polygon.map(point => ({...point}));

        projectedPolygon.forEach(point => {
            mesh.transform(point);
           camera.transform(point);
        });
    
        drawPolygon(projectedPolygon, context);
    });
}
