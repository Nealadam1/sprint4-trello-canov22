//FETCH
export const uploadImg = async (fileToUpload) => {
  //Defining our variables 
  const CLOUD_NAME = 'dqyjy6lch'
  const UPLOAD_PRESET = 'sajsbgml'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData();

  //Bulding the request body
  FORM_DATA.append('file', fileToUpload)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET);
  // Sending a post method request to Cloudinarys API
  try {
      const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: FORM_DATA
      })
      const elImg = document.createElement('img');
      const { url } = await res.json()
      return url
  } catch (err) {
      console.error(err)
  }

}