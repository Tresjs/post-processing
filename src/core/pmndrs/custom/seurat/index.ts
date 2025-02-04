import { Uniform, Vector2 } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

/**
 * SeuratEffect - A custom effect for applying a barrel distortion
 * with chromatic aberration blur.
 */

export class SeuratEffect extends Effect {
  /**
   * Creates a new SeuratEffect instance.
   *
   * @param {object} [options] - Configuration options for the effect.
   * @param {BlendFunction} [options.blendFunction] - Blend mode.
   * @param {number} [options.amount] - Intensity of the barrel distortion (0 to 1).
   * @param {Vector2} [options.offset] - Offset of the barrel distortion center (0 to 1 for both x and y). This allows you to change the position of the distortion effect.
   *
   */
  constructor({ blendFunction = BlendFunction.NORMAL, amount = 0.15, offset = new Vector2(0.5, 0.5) } = {}) {
    super('SeuratEffect', `
    uniform float amount;
    uniform vec2 offset;

    #define NUM_ITER 16

    void mainUv(inout vec2 uv) {
        uv = uv;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec3 color = inputColor.rgb;

        outputColor = vec4(color, inputColor.a); // Preserves original alpha
    }
      `, {
      blendFunction,
      uniforms: new Map<string, Uniform<number | Vector2>>([
        ['amount', new Uniform(amount)], // Uniform controlling the intensity of distortion
        ['offset', new Uniform(offset)], // Uniform controlling the offset of distortion
      ]),
    })
  }

  /**
   * The amount.
   *
   * @type {number}
   */

  get amount() {
    return this.uniforms.get('amount')?.value
  }

  set amount(value) {
    this.uniforms.get('amount')!.value = value
  }

  /**
   * The offset.
   *
   * @type {Vector2}
   */

  get offset() {
    return this.uniforms.get('offset')?.value
  }

  set offset(value) {
    this.uniforms.get('offset')!.value = value
  }
}
