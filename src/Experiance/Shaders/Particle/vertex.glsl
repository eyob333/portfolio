

uniform float uSize;


void main(){
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize =  (uSize * 10. )/ -mvPosition.z;

}