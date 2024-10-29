import {Cloudinary} from '@cloudinary/react/url'
import {Resize} from '@cloudinary/url-gen/actions/resize'

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'barfriends',
  },
  url: {
    secure: true, // force https, set to false to force http
  },
})

const useCloudinaryURLGenerator = async (): Promise<any> => {
  const myImage = cld.image('story_photo')
  myImage.resize(Resize.scale().width(100).height(100))
  const myURL = myImage.toURL()
}

export default useCloudinaryURLGenerator
