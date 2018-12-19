(() => {

    console.trace('this was written here')

    const ele = document.getElementById('webtools-description')
    
    http.get({
        url: '/templates/webtools-description.html',
        method: 'GET'  // optional and implicit
    } , (data, code, response) => {
        ele.innerHTML = data
    })

})()