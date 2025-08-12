
uniform sampler2D uTexture;

// varying vec2 vUv;

void main(){
    vec3 d = texture2D(uTexture, vUv).rgb;
    
    // csm_FragColor = vec4(vUv, 1., 1.);
}