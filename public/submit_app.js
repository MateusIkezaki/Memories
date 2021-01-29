var base64 = ''

const ChangeFileText = () => {
    const submitButton = document.getElementById('pic-upload')
    const fileChosen = document.getElementById('file-chosen')

    submitButton.addEventListener('change',function() {
        fileChosen.textContent = this.files[0].name
        var fileToLoad = this.files[0]
        var fileReader = new FileReader()
        
        fileReader.onload = async function (event){
            base64 = event.target.result
            document.getElementById('display-image').src = base64
            document.getElementById('submit-button').style.display = 'block'
        }

        fileReader.readAsDataURL(fileToLoad)
    })
}

ChangeFileText()

var previousScroll = window.pageYOffset
window.onscroll = () => {
    var currentScroll = window.pageYOffset
    if(previousScroll > currentScroll){
        document.querySelector('.navbar').style.top = '0px'
    }
    else{
        document.querySelector('.navbar').style.top = '-90px'
    }
    previousScroll = currentScroll
}

async function Submit (){
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var description = document.getElementById('description').value
    var date = new Date()
    var order = date.valueOf()

    const processeddata = {title, author, description, base64, order}

    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(processeddata)
    }

    const message = await fetch('/images', options)

    document.getElementById('title').value = ''
    document.getElementById('description').value = ''

    console.log(processeddata)

    alert('Media Uploaded Successfully!')
    document.getElementById('submit-button').style.display = 'none'
    document.getElementById('display-image').src = ""
    document.getElementById('file-chosen').textContent = 'Empty'
}

