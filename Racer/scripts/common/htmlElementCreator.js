class HTMLElementCreator {

    /**
     * @description Creates div element
     * @param id
     * @param className
     * @returns {*} Div element
     */
    static createDiv(id, className) {
        let divElement = document.createElement('div');
        divElement.id = id;
        divElement.className = className;
        return divElement;
    };

    /**
     * @description Creates image element
     * @param source
     * @param alt
     * @returns {*} Image element
     */
    static createImage(source, alt) {
        let imageElement = document.createElement('img');
        imageElement.src = source;
        imageElement.alt = alt;
        return imageElement;
    }

    /**
     * @description Creates button image element
     * @param buttonId
     * @param imageSource
     * @param imageAlt
     * @param className
     * @returns {*} Button image element
     */
    static createButtonImage(buttonId, imageSource, imageAlt, className) {
        let buttonElement = document.createElement('button');
        buttonElement.id = buttonId;
        buttonElement.className = className;
        buttonElement.type = 'button';
        const imageElement = HTMLElementCreator.createImage(imageSource, imageAlt);
        buttonElement.appendChild(imageElement);
        return buttonElement;
    };

    /**
     * @description Creates Span element
     * @param id
     * @param innerHTML
     * @param className
     * @returns {*} Span element
     */
    static createSpan(id, innerHTML, className) {
        let spanElement = document.createElement('span');
        spanElement.id = id;
        spanElement.innerHTML = innerHTML;
        spanElement.className = className;
        return spanElement;
    }

    /**
     * @description Creates hidden element
     * @param id
     * @param value
     * @param className
     * @returns {*} Hidden element
     */
    static createHiddenElement(id, value, className) {
        let hiddenElement = document.createElement('input');
        hiddenElement.type = 'hidden';
        hiddenElement.className = className;
        hiddenElement.id = id;
        hiddenElement.value = value;
        return hiddenElement;
    };
}