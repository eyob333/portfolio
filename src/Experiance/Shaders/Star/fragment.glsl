
uniform sampler2D uTexture;
uniform vec2 uResolution;

// varying vec2 vUv;

void main(){
    vec2 uv = gl_PointCoord.xy;
    // uv -= .5;
    // uv.x += uResolution.x / uResolution.y;
    vec3 d = texture(uTexture, uv).rgb;
    gl_FragColor = vec4(d, 1.);
    // csm_FragColor = vec4(n, 1., 1.);
}