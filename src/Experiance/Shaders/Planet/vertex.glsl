

varying vec2 vUv;
varying vec3 vCheck;

void main(){

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);

    vUv = uv;
    vCheck = normal;

} 