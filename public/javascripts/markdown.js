/**
 * download markdown file
 * @param {*} e 
 */
const downloadMD = (e) => {
    var md = e.target.parentNode.previousSibling.previousSibling.innerText;
    console.log(md)
    const blob = new Blob([md], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "markdown.md";
    a.href = url;
    a.click();
    a.remove();
}

/**
 * save markdown to local storage
 * @param {*} e 
 */
const saveMD = (e) => {
    var md = e.target.parentNode.previousSibling.previousSibling.innerText;
    var videoId = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.video-id').value;
    // save local storage
    localStorage.setItem(videoId, md);
}

/**
 *  add event listener to download button, save button
 */
const addEventToBtn = () => {
    const btn = document.getElementsByClassName('write-download');
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', downloadMD);
    }

    const btn2 = document.getElementsByClassName('write-save');
    for (var i = 0; i < btn2.length; i++) {
        btn2[i].addEventListener('click', saveMD);
    }
}


