"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p *= 1.95;
    a *= 0.52;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;

  // 雲っぽい大きいモヤを作る：中心基準 + aspect補正
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= (u_res.x / u_res.y);

  float t = u_time * 0.08; // ゆっくり

  // ゆるいドメインワープ（雲の流れ）
  vec2 warp = vec2(
    fbm(p * 0.65 + vec2(0.0,  t)),
    fbm(p * 0.65 + vec2(6.2, -t))
  ) - 0.5;

  vec2 q = p + warp * 0.75;

  // 低周波メイン（雲の塊）
  float low = fbm(q * 0.85);

  // 中周波を少し（ディテール）
  float mid = fbm(q * 1.80 + 3.0);

  float n = low * 0.78 + mid * 0.22; // 0..1っぽい

  // 雲っぽくするためにコントラストを丸める（境界が柔らかくなる）
  n = smoothstep(0.25, 0.85, n);

  // 青:白 = 3.5:6.5 → 青の混合率 0.35
  float targetBlue = 0.35;

  // ばらつき（雲の濃淡）
  float spread = 0.48;

  float g = clamp(targetBlue + (n - 0.5) * spread, 0.0, 1.0);

  vec3 blue = vec3(0.0, 74.0/255.0, 198.0/255.0); // #004AC6
  vec3 white = vec3(1.0);

  vec3 col = mix(white, blue, g);

  // ほんの少しだけ粒状感（雲っぽさを邪魔しない程度）
  float gr = hash(gl_FragCoord.xy + u_time) - 0.5;
  col += gr * 0.008;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroShaderBackground({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) throw new Error("shader create failed");
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh) ?? "";
        gl.deleteShader(sh);
        throw new Error(log);
      }
      return sh;
    };

    const prog = gl.createProgram();
    if (!prog) return;

    try {
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prog) ?? "");
      }
    } catch {
      gl.deleteProgram(prog);
      return;
    }

    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, "a_pos");
    const uResLoc = gl.getUniformLocation(prog, "u_res");
    const uTimeLoc = gl.getUniformLocation(prog, "u_time");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // fullscreen triangle strip (2 triangles)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        if (uResLoc) gl.uniform2f(uResLoc, w, h);
      }
    };

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      resize();
      const now = performance.now();
      const time = prefersReduced ? 0 : (now - start) / 1000;
      if (uTimeLoc) gl.uniform1f(uTimeLoc, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    tick();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      if (buf) gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}