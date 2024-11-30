uniform float amount;

#define NUM_ITER 16
#define RECIP_NUM_ITER 0.0625
#define GAMMA 2.2

float sat(float t) {
    return clamp(t, 0.0, 1.0);
}

vec3 spectrum_offset(float t) {
    float lo = step(t, 0.5);
    float hi = 1.0 - lo;
    float w = 1.0 - abs(2.0 * t - 1.0);
    return pow(vec3(lo, 1.0, hi) * vec3(1.0 - w, w, 1.0 - w), vec3(1.0 / GAMMA));
}

vec2 barrelDistortion(vec2 p, float amt) {
    p = 2.0 * p - 1.0;
    float theta = atan(p.y, p.x);
    float radius = pow(length(p), 1.0 + 3.0 * amt);
    return 0.5 * (vec2(cos(theta), sin(theta)) * radius + 1.0);
}

void mainUv(inout vec2 uv) {
    uv = barrelDistortion(uv, amount);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 sumcol = vec3(0.0);
    vec3 sumw = vec3(0.0);

    for (int i = 0; i < NUM_ITER; ++i) {
        float t = float(i) * RECIP_NUM_ITER;
        vec3 w = spectrum_offset(t);
        vec2 distortedUV = barrelDistortion(uv, amount * t);
        sumcol += w * texture(inputBuffer, distortedUV).rgb;
        sumw += w;
    }

    vec3 outcol = pow(sumcol / sumw, vec3(1.0 / GAMMA));
    outputColor = vec4(outcol, 1.0);
}
