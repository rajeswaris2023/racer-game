class CarAdder {

    /**
     * @description Adds car to screen
     * @param containerId
     * @param imageSource
     * @param imageAlt
     * @returns none
     */
    static addCar(containerId, imageSource, imageAlt) {
        let container = document.getElementById(containerId);
        const image = HTMLElementCreator.createImage(imageSource, imageAlt);
        container.appendChild(image);
    };
}