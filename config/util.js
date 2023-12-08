import axios from 'axios'

export const timeStamp = function () {
  const time = Date.now();
  return time
}

export const kooLogin = function (cName) {
  console.log('hitoryBackhitoryBackhitoryBack')
  cName = cName + '=';
  const cookieData = document.cookie;
  let start = cookieData.indexOf(cName);
  let cValue = '';
  if (start !== -1) {
    start += cName.length;
    let end = cookieData.indexOf(';', start);
    if (end === -1) end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  return unescape(cValue);
}

export const uploadImgPreview = (files) => {
  // @breif 업로드 파일 읽기

  const fileInfo = files

  const reader = new FileReader()

  // @details INDEX #01 실행 이후, 파일의 업로드( onload )가 확인되고 나서 실행된다.

  reader.onload = function () {
    // @details 업로드한 파일의 URL을 가져온다.
    document.getElementById('preview').src = reader.result
    // @breif 썸네일 이미지 생성

    const tempImage = new Image() // @details drawImage 메서드에 넣기 위해 이미지 객체화

    tempImage.src = reader.result // @details data-uri를 이미지 객체에 주입

    tempImage.addEventListener('load', function () {
      // @breif 캔버스 위에 이미지 그리기

      const canvas = document.getElementById('canvas')

      const canvasContext = canvas.getContext('2d')

      // @breif 캔버스 크기 셋팅

      canvas.width = 240

      canvas.height = 300

      // @breif 캔버스 위에 이미지 그리기

      canvasContext.drawImage(
        this, // @details 업로드한 이미지 파일의 정보

        -10, // @details X좌표

        -10, // @details Y좌표

        270, // @details 넣을 이미지의 가로 사이즈( 해당 예제는 변화를 보기위해 살짝 크게 했다. )

        330 // @details 넣을 이미지의 세로 사이즈( 해당 예제는 변화를 보기위해 살짝 크게 했다. )
      )
      // @breif 캔버스 위에 이미지 그리기
      canvasContext.stroke()
      // @breif 캔버스의 이미지 URL 정보를 받아 썸네일 출력
      const dataURI = canvas.toDataURL('image/jpeg')
      document.querySelector('#thumbnail').src = dataURI
    })
  }

  if (fileInfo) {
    console.log('INDEX #01')

    // @details readAsDataURL을 통해 업로드한 파일의 URL을 읽어 들인다.

    reader.readAsDataURL(fileInfo)
  }

}
export const historyBack = function () {
  console.log('hitoryBackhitoryBackhitoryBack')
}

export const axiosForm = function (frm, url) {
  axios
    .post(process.env.VUE_APP_API + url, frm, {
      header: {
        'Context-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('axiosForm', res.data)
    })
    .catch((res) => {
      console.log('AXIOS FALSE', res)
    })
}

export const copyToClipBoard = function (id) {
  const content = document.getElementById(id)
  content.select()
  document.execCommand('copy')

  alert('Copied!')
}
