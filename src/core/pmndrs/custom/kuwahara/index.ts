import { Uniform, Vector2 } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

/**
 * KuwaharaEffect - A custom effect for applying a barrel distortion
 * with chromatic aberration blur.
 */

const fragmentShader = `
#define SECTOR_COUNT 8

uniform float radius;

float random(vec2 c) {
  return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float gaussianWeight(float distance, float sigma) {
    return exp(-(distance * distance) / (2.0 * sigma * sigma));
}

void getSectorVarianceAndAverageColor(float angle, float radius, vec2 uv, out vec3 avgColor, out float variance) {
    vec3 weightedColorSum = vec3(0.0);
    vec3 weightedSquaredColorSum = vec3(0.0);
    float totalWeight = 0.0;

    float sigma = radius / 3.0;

    for (float r = 0.0; r < radius; r++) {
    
        for (float a = angle; a < angle + 2.0 * 3.14159265359 / float(SECTOR_COUNT); a += 0.1) {
            vec2 offset = vec2(cos(a), sin(a)) * r;
            vec2 coord = uv + offset / resolution;
            vec3 color = texture2D(inputBuffer, coord).rgb;

            float weight = gaussianWeight(length(offset), sigma);
            weightedColorSum += color * weight;
            weightedSquaredColorSum += color * color * weight * 20.;
            totalWeight += weight;
        }
    }

    avgColor = weightedColorSum / totalWeight;
    variance = length(weightedSquaredColorSum / totalWeight - avgColor * avgColor);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 finalColor = vec3(0.0);
    float minVariance = 1e20;

    for (int i = 0; i < SECTOR_COUNT; i++) {
        float angle = float(i) * 2.0 * 3.14159265359 / float(SECTOR_COUNT);
        vec3 avgColor;
        float variance;
        getSectorVarianceAndAverageColor(angle, radius, uv, avgColor, variance);

        if (variance < minVariance) {
            minVariance = variance;
            finalColor = avgColor;
        }
    }

    outputColor = vec4(finalColor, inputColor.a);
}
`

export class KuwaharaEffect extends Effect {
  /**
   * Creates a new KuwaharaEffect instance.
   *
   * @param {object} [options] - Configuration options for the effect.
   * @param {BlendFunction} [options.blendFunction] - Blend mode.
   * @param {number} [options.radius] - Intensity of the barrel distortion (0 to 1).
   *
   */
  constructor({ blendFunction = BlendFunction.NORMAL, radius = 1 } = {}) {
    super('KuwaharaEffect', fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ['radius', new Uniform(radius)],
      ]),
    })
  }

  /**
   * The radius.
   *
   * @type {number}
   */

  get radius() {
    return this.uniforms.get('radius').value
  }

  set radius(value) {
    this.uniforms.get('radius').value = value
  }
}
