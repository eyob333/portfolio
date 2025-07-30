uniform sampler2D uTexture;
varying vec2 vUv;
varying vec4 uColor;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    vUv = uv;
}