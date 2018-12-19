"use strict";

(async () => {

    const loadTemplate = async (template) => {
        return await fetch(`/templates/${template}.html`).then((response) => {
            if(response.status === 404) return Promise.resolve(undefined)
            return response.text()
        })

    }

    const scriptFileExists  = async (filename)  => {
        return await fetch(filename, { method: "HEAD" }).then((response) => {
            if(response.status === 404) return Promise.resolve(undefined)
            return Promise.resolve(true)
        })
    }

    const addScriptTag = (src) => {
        let s = document.createElement('script')
        s.src = src
        s.type = "text/javascript"
        document.body.appendChild(s)
    }

    const appendTools = async () => {
        
        const toolsList = document.getElementById('tools-list')

        if(window.tools === undefined || window.tools === null) {
            throw new Error('could not find tools')
        }

        window.tools = window.tools.sort((a, b) => {
            return a.order < b.order ? -1 : 1
        })


        var index = 0
        window.tools.forEach(async (tool) => {
            const {name, title, description, script} = tool
            
            const template = await loadTemplate(name)
            if( template === undefined) return
            console.log(tool)
            const ele = document.createElement('LI')
            ele.setAttribute('id' , `${name}-${index}`)
            ele.innerHTML = `
                <h3 class="title">${title}</h3>
                <p class="description">${description}</p>
                <div class="inner">
                ${template}
                </div>
            `
            if(toolsList.children.length > 0) {
                toolsList.children[toolsList.children.length - 1].after(ele)
            } else {
                toolsList.appendChild(ele)
            }
            
            index += 1

            if(await scriptFileExists(script)) return
            addScriptTag(script)
            console.log('javascript file shoild be loaded')
        })
        
    }

    const listTemplate = await loadTemplate('webtools-list')

    const ele = document.getElementById('webtools-list');
    ele.innerHTML = listTemplate;
    await appendTools()
})();
