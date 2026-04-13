/// <reference types="@cloudflare/workers-types" />

/** ASSETS の最小型（Fetcher を import せず自前定義） */
interface AssetsBinding {
  fetch: (request: Request) => Promise<Response>;
}

/** Worker で使う環境変数/シークレット */
interface Env {
  ASSETS: AssetsBinding;
  ENVIRONMENT: 'production' | 'staging';
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASS?: string;
}

/**
 * Cloudflare Worker entrypoint
 * - SSG（静的ファイル配信）
 * - staging 環境のみ Basic 認証
 */
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (env.ENVIRONMENT === 'staging') {
      const authHeader = request.headers.get('Authorization');

      // 認証なし → 401
      if (!authHeader) {
        return new Response('Authentication required', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Stage Access"' },
        });
      }

      const [scheme, encoded] = authHeader.split(' ');
      if (scheme !== 'Basic' || !encoded) {
        return new Response('Invalid Authorization header', { status: 400 });
      }

      const decoded = atob(encoded);
      const sep = decoded.indexOf(':');
      const user = sep >= 0 ? decoded.slice(0, sep) : '';
      const pass = sep >= 0 ? decoded.slice(sep + 1) : '';

      if (user !== env.BASIC_AUTH_USER || pass !== env.BASIC_AUTH_PASS) {
        return new Response('Forbidden', { status: 403 });
      }
    }

    // 静的ファイル配信（/out を assets バインド）
    return env.ASSETS.fetch(request);
  },
};

export default worker;
