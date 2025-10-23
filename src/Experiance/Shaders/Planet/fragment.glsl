
uniform sampler2D uAlbedo;

varying vec2 vUv;
varying vec3 vCheck;

void main(){
    gl_FragColor = vec4(vCheck, 1.);
}