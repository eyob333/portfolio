

varying vec2 vUv;
varying vec3 vCheck;
varying vec3 vNormal;
varying vec3 vPosition;


void main(){
// Model normal

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vNormal = modelNormal.xyz;
    vPosition = modelPosition.xyz;
    vCheck = normal;

} 