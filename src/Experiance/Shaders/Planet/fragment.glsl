
uniform sampler2D uAlbedo;
uniform sampler2D uRoughness;
uniform sampler2D uCloud;
uniform sampler2D uNormal;
uniform sampler2D uAo;

uniform float uDirectionalIntensity;
uniform vec3 uDirectionalColor;
uniform vec3 uLightDirection;
uniform float uAmbientIntesity;
uniform vec3 uAmbientColor;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;


varying vec2 vUv;
varying vec3 vCheck;
varying vec3 vNormal;
varying vec3 vPosition;


vec3 directionalLight( vec3 normal, float intensity, vec3 lightColor, vec3 lightPosition, vec3 viewDirection){
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(lightDirection, normal);

    float shading = dot(lightDirection, normal);
    shading = max(.0, shading);
    
    // specular
    float specular = -dot(lightReflection, viewDirection);
    specular = max(.0, specular);
    specular = pow(specular, 20.);
    

    return lightColor * intensity * shading;
    // return vec3(specular);
}

vec3 ambientLight( vec3 lightColor, float intensitY){
    return lightColor * intensitY;
}

void main(){
    // textures
    vec3 albedo = texture(uAlbedo, vUv).rgb;
    vec3 roughness = texture2D(uRoughness, vUv).rgb;
    vec3 normalT = normalize(texture2D(uNormal, vUv).xyz  * 2. - 1.);
    vec3 cloud = texture(uCloud, vUv).rgb;
    vec3 ao = texture2D(uAo, vUv).rgb;

    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = vec3(.0);


    // light Direction 
    vec3 lightDirection = uLightDirection;
    float lightOrientation = dot(lightDirection,  normal * normalT);

    float lightfac = smoothstep(-.25, .5, lightOrientation);
    vec3 darkSide = ambientLight(
        albedo,
        uAmbientIntesity
    );  
    color = mix( darkSide , albedo, lightfac);

    //cloud
    float cloudFac = smoothstep(.4, 1., cloud.r);
    cloudFac *= lightfac;
    color = mix(color, vec3(1.), cloudFac);

    //fresnel
    float fresnel = dot(viewDirection, normal) + 1.;
    fresnel = pow(fresnel, 4.);

    //atmosphere
    float atmosphereFac = smoothstep(-.5, 1., lightOrientation);
    vec3  atmosphereColor = mix(uAtmosphereDayColor, uAtmosphereTwilightColor, atmosphereFac);
    color = mix( color, atmosphereColor, fresnel * atmosphereFac);
     
    // Specular
    vec3 reflection = reflect(- lightDirection, normal );
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, .0);
    specular = pow(specular, 30.0);

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;

    // color += directionalLight( 
    //     normalT.r * normal,
    //     uDirectionalIntensity,
    //     uDirectionalColor,
    //     vec3(.0, .0, .3),
    //     viewDirection
    // );

    // color = vec3(lightOrientation);



    // cloud mix
    float cloudMix = smoothstep(.5, .1, roughness.r);

    // color = mix(color, vec3(1.), cloudMix);
    // color =  normal ;
    

    // color = mix(albedoN, albedoD, lightOrientation);

    



    gl_FragColor = vec4(color, 1.);
}