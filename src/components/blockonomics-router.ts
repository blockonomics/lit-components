import {html, LitElement} from 'lit';

export class BlockonomicsRouter extends LitElement {
    activeRoute = null;
    routes = [];

    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this.handleHashChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    setRoutes(routes = []) {
        this.routes = routes;
        this.handleHashChange();
    }

    handleHashChange = () => {
        const path = window.location.hash.substring(1);
        this.activeRoute = path.split('?')[0] || '/';
        this.requestUpdate();
    }

    findRouteByPath(path) {
        if (this.routes.length > 0) {
            return this.routes.find(route => route.path === path);
        }

        return null;
    }

    renderComponent(tagName) {
        // Dynamically create the element
        const element = document.createElement(tagName);
        return html`${element}`;
    }

    render() {
        const route = this.findRouteByPath(this.activeRoute);
        if (route && route.tag) {
            return this.renderComponent(route.tag);
        } else {
            return html`<p>Page not found</p>`;
        }
    }
}

customElements.define('blockonomics-router', BlockonomicsRouter);