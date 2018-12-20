(() => {
    
    window.radiansConverter = () => {
    
        const tableBody = document.getElementById('radians-table-body')
        const degressTableBody = document.getElementById('degress-table-body')
    
        for(let x = 1; x <= 6; x++) {
    
            const radians = x;
            const degrees = x * 180 / Math.PI
    
            const ele = document.createElement('tr')
            const text = `
                    <td>${radians} <small>rad</small></td>
                    <td>${degrees.toFixed(2)}&deg;</td>
                    <td>${radians}rad * 180 / &pi; = ${degrees.toFixed(2)}&deg;</td>
            `
            ele.innerHTML = text
    
            if(tableBody.children.length === 0) {
                ele.innerHTML = text
                tableBody.appendChild(ele)
            } else {
                tableBody.children[tableBody.children.length - 1].after(ele) 
            }
            
        }

        const addDegreeToRadin = (degreesNum) => {
            const degrees = degreesNum;
            const radians = degreesNum * Math.PI / 180
    
            const ele = document.createElement('tr')
            const text = `
                    <td>${degrees}&deg;</td>
                    <td>${radians.toFixed(2)} <small>rad</small></td>
                    <td>${degreesNum}&deg; * &pi; / 180 = ${radians.toFixed(2)} <small>rad</small></td>
            `
            ele.innerHTML = text
    
            if(degressTableBody.children.length === 0) {
                ele.innerHTML = text
                degressTableBody.appendChild(ele)
            } else {
                degressTableBody.children[degressTableBody.children.length - 1].after(ele) 
            }
        }

        
        for(let y = 0; y < 360; y += 15) {
            addDegreeToRadin(y)
            if(y === 0) addDegreeToRadin(1)
        }
    }
})()
