export const scrollFunctions = function () {
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 100vh;
   `;
};

export const enableScroll = function () {
    document.body.style.cssText = ``;
    window.scroll({
        top: document.body.dbScrollY
    });
};

export const scrollUp = function () {
    window.scroll({
        top:  window.pageYOffset - window.scrollY
    })
};

