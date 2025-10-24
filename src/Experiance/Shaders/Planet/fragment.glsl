
uniform sampler2D uAlbedo;
uniform sampler2D uAlbedoNight;
uniform sampler2D uSpecular;
uniform sampler2D uDisplacement;
uniform float uDirectionalIntensity;
uniform vec3 uDirectionalColor;
uniform vec3 uLightDirection;
uniform float uAmbientIntesity;
uniform vec3 uAmbientColor;


varying vec2 vUv;
varying vec3 vCheck;
varying vec3 vNormal;
varying vec3 vPosition;


vec3 directionalLight( vec3 normal, float intensity, vec3 lightColor, vec3 lightPosition, vec3 viewDirection){
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(normal, lightPosition);

    // specular
    float specular = - dot(lightReflection, viewDirection);

    float shading = dot(lightDirection, normal);
    shading = max(.0, shading);
    return lightColor * intensity * shading * specular;
    // return vec3(specular);
}

vec3 ambientLight( vec3 lightColor, float intensitY){
    return lightColor * intensitY;
}

void main(){
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);

    vec3 color = vec3(.0);

    // albedo
    vec3 albedoD = texture(uAlbedo, vUv).rgb;
    vec3 albedoN = texture(uAlbedoNight, vUv).rgb;
    vec3 specular = texture(uSpecular, vUv).rgb;



    // light Direction 
    vec3 lightDirection = vec3(.0, .0, 1.);
    float lightOrientation = dot(lightDirection, vCheck);

    color += ambientLight(
        uAmbientColor,
        uAmbientIntesity
    );

    color += directionalLight( 
        normal,
        uDirectionalIntensity,
        uDirectionalColor,
        vec3(.0, .0, .3),
        viewDirection
    );
    color *= albedoD;
    // color = mix(color, vec3(1.), specular.r);
    

    // color = mix(albedoN, albedoD, lightOrientation);

    



    gl_FragColor = vec4(color, 1.);
}