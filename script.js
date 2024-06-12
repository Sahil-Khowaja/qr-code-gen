let imgBox = document.getElementById('imgBox');
let downloadBtn = document.getElementById('download');
let qrImg = document.getElementById('qrImg');
let qrText = document.getElementById('qrText');

function generateQr(){
    if(qrText.value.length > 0 ){
    qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+ qrText.value 
    imgBox.classList.add("show-img") 
    downloadBtn.classList.add("show-btn") }

    else {
        // alert("Enter a link or text")
        qrText.classList.add('error')
        setTimeout(()=>{
            qrText.classList.remove('error')
        },1000)
    }
}


async function downloadQr() {
    const qrTextValue = qrText.value.trim();
    if (!qrTextValue) {
        console.error('QR text is empty');
        return;
    }

    try {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrTextValue)}`;
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.png';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading QR code:', error);
    }
}




