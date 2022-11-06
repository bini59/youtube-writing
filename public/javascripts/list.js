console.clear();

const app = (() => {
	let menu;
    let editor;
    let editor_toggle;
	
	const init = () => {
		menu = document.getElementsByClassName('video-info');
        editor = document.getElementsByClassName('video-write-md');
        editor_toggle = document.getElementsByClassName('video-toggle-btn');

        applyListeners();
        
        // var video = document.querySelector(".video-youtube");
        // video.setAttribute("src", "https://www.youtube-nocookie.com/embed/GxZc7GQoaFs");
	}
	
    const applyListeners = () => {
        console.log('applyListeners');
        for (var i = 0; i < menu.length; i++) {
            menu[i].addEventListener('click', (e) => toggleClass(e.target, 'video-active'));
        }
        for (var i = 0; i < menu.length; i++) {
            editor_toggle[i].addEventListener('click', (e) => toggleClass(e.target, 'editor-active'));
        }
        for (var i = 0; i < editor.length; i++) {
            editor[i].addEventListener('keyup', (e) => parseMD(e.target));
        }
    }
    
    const parseMD = (editor) => {
        var viewer = editor.nextElementSibling;

        var text = editor.innerText;
        var html = marked.parse(text);
        viewer.innerHTML = html;
    }
	
    const toggleClass = (e, stringClass) => {
        console.log(e);
        var el = e;
        while(!el.classList.contains('video-container')){
            el = el.parentElement;
        }

		if(el.classList.contains(stringClass))
			el.classList.remove(stringClass);
		else
			el.classList.add(stringClass);
	}
	
	init();
});

