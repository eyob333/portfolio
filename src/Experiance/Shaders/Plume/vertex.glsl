

varying vec2 vUv;
varying vec3 vPositon;


void main(){
    float yLength = 1. - (uv.y);
    float xLength = 1. - uv.x;
    vec3 newPosition = position;
    // newPosition.x *= yLength;
    // newPosition.z *= xLength;
    // newPosition.y *= yLength;
    // newPosition.x *=  yLength;
    gl_Position = projectionMatrix  * viewMatrix * modelMatrix * vec4( newPosition, 1.);
    vUv = uv;
    vPositon = position;
}