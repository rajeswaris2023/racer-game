class HtmlElementHelper {

    /**
     * @description Returns element in the document
     * @param elementName
     * @returns {*} Element
     */
    static getElement(elementName) {
        return document.getElementById(elementName);
    }

    /**
     * @description Returns offset from top of the element using element name
     * @param elementName
     * @returns {*} Offset from top of element
     */
    static getOffsetFromTopByName(elementName) {
        const element = HtmlElementHelper.getElement(elementName);
        return HtmlElementHelper.getOffsetFromTopByElement(element);
    }

    /**
     * @description Returns offset from top of element using element
     * @param element
     * @returns {*} Offset from top of element
     */
    static getOffsetFromTopByElement(element) {
        if(element.style.top === undefined || element.style.top === null || element.style.top === '') {
            return Number.parseInt(getComputedStyle(element).top.split('px')[0]);
        }
        else {
            return Number.parseInt(element.style.top.split('px')[0]);
        }
    }

    /**
     * @description Sets offset from top of element
     * @param element
     * @param topOffset
     * @returns none
     */
    static setOffsetFromTopByElement(element, topOffset) {
        element.style.setProperty('top', topOffset);
    }

    /**
     * @description Sets offset from top of element by element name
     * @param elementName
     * @param topOffset
     * @returns none
     */
    static setOffsetFromTopByName(elementName, topOffset) {
        const element = HtmlElementHelper.getElement(elementName);
        HtmlElementHelper.setOffsetFromTopByElement(element, topOffset);
    }

    /**
     * @description Returns offset from left of element by element name
     * @param elementName
     * @returns {*} Offset from left of element
     */
    static getOffsetFromLeftByName(elementName) {
        const element = HtmlElementHelper.getElement(elementName);
        return HtmlElementHelper.getOffsetFromLeftByElement(element);
    }

    /**
     * @description Returns offset from left of element by element
     * @param element
     * @returns {*} Offset from left of element
     */
    static getOffsetFromLeftByElement(element) {
        return Number.parseInt(getComputedStyle(element).left.split('px')[0]);
    }

    /**
     * @description Sets offset from left of element by element
     * @param element
     * @param leftOffset
     * @returns none
     */
    static setOffsetFromLeftByElement(element, leftOffset) {
        element.style.setProperty('left', leftOffset);
    }

    /**
     * @description Returns height of element by element
     * @param element
     * @returns {*} Height of element
     */
    static getHeightByElement(element) {
        return Number.parseInt(getComputedStyle(element).height.split('px')[0]);
    }

    /**
     * @description Returns height of element by element name
     * @param elementName
     * @returns {*} Height of element
     */
    static getHeightByName(elementName) {
        const element = HtmlElementHelper.getElement(elementName);
        return HtmlElementHelper.getHeightByElement(element);
    }

    /**
     * @description Returns visibility of element by element
     * @param element
     * @returns {*} Visibility of element
     */
    static getVisibilityByElement(element) {
        return getComputedStyle(element).visibility;
    }

    /**
     * @description Returns visibility of element by element name
     * @param elementName
     * @returns {*} Visibility of element
     */
    static getVisibilityByName(elementName) {
        const element = HtmlElementHelper.getElement(elementName);
        return HtmlElementHelper.getVisibilityByElement(element);
    }

    /**
     * @description Sets visibility of element by element
     * @param element
     * @param visibility
     * @returns none
     */
    static setVisibilityByElement(element, visibility) {
        element.style.setProperty('visibility', visibility);
    }

    /**
     * @description Sets visibility of element by element name
     * @param elementName
     * @param visibility
     * @returns none
     */
    static setVisibilityByName(elementName, visibility) {
        const element = HtmlElementHelper.getElement(elementName);
        HtmlElementHelper.setVisibilityByElement(element, visibility);
    }
}