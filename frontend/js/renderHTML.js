/**
 * Render a generic node
 * @param {string} nodeType 
 * @param {string | null} id
 * @param {string | null} classList
 * @returns {HTMLElement}
 */
function renderNode(nodeType, id = null, classList) {
    const node = document.createElement(nodeType);
    if (id) {
        node.id = id;
    }
    if (classList) {
        node.classList = classList;
    }
    return node;
}

/**
 * Render div
 * @param {string | null} id
 * @param {string | null} classList
 * @returns {HTMLDivElement}
 */
function renderDiv(id = null, classList= null) {
    return renderNode("div", id, classList);
}

/**
 * Render Radio button
 * @param {string | null} classList
 * @param {string | null} name
 * @param {string | null} value
 * @returns {HTMLInputElement}
 */
function renderRadio(classList = null, name = null, value = null){
    const radio = renderNode("input", null, classList);
    radio.type = "radio";
    if (name) {
        radio.name = name;
    }
    if (value) {
        radio.value = value;
    }
    return radio;
}

export {renderDiv, renderRadio, renderNode};