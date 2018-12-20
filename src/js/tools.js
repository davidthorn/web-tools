window.tools = [

    {
        order: 0,
        title: "Radians (<small>rad</small>) to Degrees&deg; Converter",
        description: "For some reason I alway forget the formula for converting radians to degrees. I know that it uses &pi; and 180, but always forget the order in which they are used. So the easiest solution was to do this and hopefully this will either help me to remember or it will give me a guide to remember.",
        name: "radians-converter",
        script: "/js/radians-converter.js",
        stylesheet: "/css/radians-converter.css",
        render: () => { 
            const interval = setInterval(() => {
                if(window.radiansConverter !== undefined) {
                    window.radiansConverter()
                    clearInterval(interval)
                } 
            }, 100)
        },
        active: true
    },
    {
        order: 1,
        title: "Angle Calculator",
        description: "This is a description about my angle converter which I will maybe implement.",
        name: "angle-calculator",
        script: "/js/angle-calculator.js"
    },
    {
        order: 2,
        title: "Http Headers Check",
        description: "This web tool will output the headers which are received from making a http request",
        name: "http-headers",
        script: "/js/http-headers.js"
    },
    {
        order: 3,
        name: "other",
        script: "/js/radians-converter.js"
    }

]