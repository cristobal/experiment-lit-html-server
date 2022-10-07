import { renderToString } from '@popeindustries/lit/html-server.js';
import { css, html, LitElement } from '@popeindustries/lit';
import everything, { registerMyEl } from './the-everything-bagel-template.js';
import http from 'node:http';
import { hydratable } from '@popeindustries/lit/directives/hydratable.js';
import { LitElementRenderer } from '@popeindustries/lit/lit-element-renderer.js';

registerMyEl(LitElement, css);

/**
 * @param { { title: string, isTrue: boolean, number: number } } data
 */
async function template(data) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${data.title}</title>
      </head>
      <body>
        ${hydratable(everything(data))}
      </body>
    </html>
  `;
}

http
  .createServer(async (req, res) => {
    const data = {
      title: new Date().toISOString(),
      isTrue: Math.random() > 0.5,
      number: Math.random() * 100,
    };
    res.writeHead(200);
    res.write(
      await renderToString(template(data), { elementRenderers: [LitElementRenderer] })
    );
    res.end();
  })
  .listen(3000);
