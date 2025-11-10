export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes('.')) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    if (response.status === 404) {
      return new Response('Not Found', { status: 404 });
    }

    const newResponse = new Response(response.body, response);
    const headers = newResponse.headers;

    if (url.pathname === '/' || url.pathname === '/index.html') {
      headers.set('Cache-Control', 'no-store');
      headers.set('Content-Type', 'text/html; charset=UTF-8');
    } else if (!headers.has('Cache-Control')) {
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    return newResponse;
  }
};
