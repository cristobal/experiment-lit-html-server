import { html } from '@popeindustries/lit';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';

/**
 * @param { { title: string, isTrue: boolean, number: number } } data
 */
export default function everything(data) {
  return html`
    <header><h1 class="${classMap({ negative: data.isTrue })}" ?negative="${data.isTrue}">${data.title}</h1></header>
    <main>
      <ol>
        ${Array.from({ length: data.number }).map(
          (v, i) => html`
            <li>
              List Item ${i} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie lacus eget ipsum
              pellentesque, quis ullamcorper enim semper
            </li>
          `,
        )}
      </ol>
      <p ?a="${true}">
        First Paragraph: Duis eleifend nec lectus a ${data.number}. Suspendisse placerat mollis porta. Pellentesque nec
        quam non sapien facilisis ultricies quis nec risus. Quisque feugiat dui quis lectus iaculis, molestie pretium
        augue tincidunt. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
        ac turpis egestas. Suspendisse quis libero sagittis, vulputate magna in, laoreet sem. Ut elementum nunc eget
        libero hendrerit eleifend at eget sem. Sed vel urna consequat, interdum massa in, mollis justo. Pellentesque
        porttitor auctor sapien, sit amet elementum turpis imperdiet ac. Cras luctus, sem vel finibus vehicula, mauris
        tellus iaculis orci, sit amet sodales velit augue non felis. Nullam vehicula gravida justo non lacinia.
      </p>
      <p>${nestedTemplate(html, data)}</p>
      <p ?a="${false}">
        Second Paragraph: Mauris lobortis, nisl vitae hendrerit vulputate, est lacus efficitur ipsum, nec blandit nisi
        diam in dolor. Proin ${JSON.stringify(data)} laoreet nisi a vulputate. Praesent non congue quam, ut sodales
        risus. Curabitur ornare elit at suscipit pulvinar. Suspendisse vitae orci a justo laoreet vestibulum quis et ex.
        Integer nec risus aliquam, convallis erat in, dignissim sapien. Suspendisse metus felis, volutpat a tempus ut,
        semper in tortor. Mauris rutrum dui in elit blandit, non vestibulum felis cursus. Sed mollis consectetur eros a
        lobortis. Sed lobortis lorem eu metus auctor tempus. Sed faucibus sit amet urna vel accumsan. Cras luctus in
        lorem ac tempor. Sed ullamcorper consectetur ligula sed malesuada.
      </p>
      <p .prop="${data.title}" ?visible="${data.isTrue}">
        Third Paragraph: Lorem ipsum dolor sit amet,${nestedTemplate(html, data)}
      </p>
      <button
        ${ref((el) => console.log(el))}
        @click=${function onClick() {
          console.log('click');
        }}
      >
        Button: Lorem ipsum!
      </button>
      <div .prop=${data.isTrue}><span>Div: Lorem ipsum</span></div>
      <my-el ?negative="${!data.isTrue}"></my-el>
    </main>
  `;
}

/**
 * @param { Function } html
 * @param { { title: string, isTrue: boolean, number: number } } data
 */
function nestedTemplate(html, data) {
  const hi = 'hi';
  const you = 'you';
  return html`
    <p .num=${data.number} foo="${hi} there ${you}">
      Nested First Paragraph: Lorem ipsum ${data.number} sit amet, consectetur adipiscing elit. Nunc molestie lacus eget
      ipsum pellentesque, quis ullamcorper enim semper.
    </p>
    <p>
      Nested Second Paragraph: Lorem ipsum dolor sit ${data.number}, consectetur adipiscing elit. Nunc molestie lacus
      eget ipsum pellentesque, quis ullamcorper enim semper.
    </p>
  `;
}

/**
 * @param { { new(): HTMLElement } } BaseClass
 * @param { import('@popeindustries/lit-element').css } css
 */
export function registerMyEl(BaseClass, css) {
  class MyEl extends BaseClass {
    static styles = css`
      p {
        color: green;
      }
    `;
    render() {
      return html`<p>I am green!</p>`;
    }
  }

  customElements.define('my-el', MyEl);
}
