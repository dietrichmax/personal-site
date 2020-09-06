from PIL import Image
import glob, os

count = 0
image_list = []
basewidth = 1920
extensions = ['*.webp', '*.jpg', '*.png']

for extension in extensions:
    for file in glob.iglob('V:/Websites/GIS-Netzwerk-NextJS/images/ESA/{}'.format(extension)):
        im=Image.open(file)
        image_list.append(os.path.basename(file))
        width, height = im.size
        wpercent = (basewidth / float(im.size[0]))
        hsize = int((float(im.size[1]) * float(wpercent)))
        newImage = im.resize((basewidth, hsize), Image.LANCZOS)
        newPath = './public/images/{}.jpg'.format(image_list[count].replace(".jpg", ""))
        newImage.save(newPath,optimize=True,quality=90)
        print('Optimized "{}"'.format(image_list[count]))
        count +=1 