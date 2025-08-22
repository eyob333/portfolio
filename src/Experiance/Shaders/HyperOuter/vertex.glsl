
varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;

void main(){
    vec3 pos = position;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);

    vUv = uv;
}