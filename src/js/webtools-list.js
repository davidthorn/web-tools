"use strict";

document.addEventListener('DOMContentLoaded', async ( ) => {

    const loadTemplate = async (template) => {
        return await fetch(`/templates/${template}.html`).then((response) => {
            if (response.status === 404) return Promise.resolve(undefined)
            return response.text()
        })

    }

    const fileExists = async (filename) => {
        if (filename === undefined) return Promise.resolve(undefined)
        return await fetch(filename, { method: "HEAD" }).then((response) => {
            if (response.status === 404) return Promise.resolve(undefined)
            return Promise.resolve(true)
        })
    }

    const addScriptTag = (src) => {
        let s = document.createElement('script')
        s.src = src
        s.type = "text/javascript"
        document.body.children[document.body.children.length - 1].after(s)
    }

    const addCssTag = (src) => {
        let s = document.createElement('link')
        s.href = src
        s.rel = "stylesheet"
        document.body.appendChild(s)
    }

    const appendTools = async () => {

        const toolsList = document.getElementById('tools-list')

        if (window.tools === undefined || window.tools === null) {
            throw new Error('could not find tools')
        }

        window.tools = window.tools.sort((a, b) => {
            return a.order > b.order ? 1 : -1
        })

        let promises = []
        window.tools.forEach((tool, index) => {

            const p = new Promise(async (resolve) => {
                
                const { name, script, stylesheet, active } = tool

                if(active === undefined) {
                    delete window.tools[index]
                    return resolve(true)
                }

                const template = await loadTemplate(name)
                if (template === undefined) {
                    delete window.tools[index]
                    return resolve(true)
                }
                window.tools[index].template = template
                if (await fileExists(script)) {
                    addScriptTag(script)
                }
    
                if (await fileExists(stylesheet)) {
                    addCssTag(stylesheet)
                }

                resolve(true)
            })

            promises.push(p)
        })

        await Promise.all(promises)

        window.tools.forEach((tool, index) => {
            const { name, title, description, template, render } = tool

            const ele = document.createElement('LI')
            ele.setAttribute('id', `${name}-${index}`)
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

            if(render !== undefined) {
                render()
            }
            
            index += 1

        })

    }

    const listTemplate = await loadTemplate('webtools-list')

    const ele = document.getElementById('webtools-list');
    ele.innerHTML = listTemplate;
    await appendTools()

})