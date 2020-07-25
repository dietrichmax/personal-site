from PIL import Image
import glob, os

count = 0
image_list = []
size = (1920,1080)
basewidth = 1920
types = ('*.jpg', '*.png', '*.web')

for file in glob.iglob('V:/Websites/GIS-Netzwerk/images/_in-use/posts/*.jpg'):
    im=Image.open(file)
    image_list.append(os.path.basename(file))
    width, height = im.size
    wpercent = (basewidth / float(im.size[0]))
    hsize = int((float(im.size[1]) * float(wpercent)))
    imThumbnail = im.resize((basewidth, hsize), Image.LANCZOS)
    newThumbnail = 'static/assets/img/postImg/{}.jpg'.format(image_list[count].replace(".jpg", ""))
    imThumbnail.save(newThumbnail,optimize=True,quality=90)
    count +=1 