import os
import sys
import re

os.chdir(sys.path[0])

images_dir = "./static/images/"
html_dir = "./docs/"
regex = r'<img src="(\/images\/\S*)"'


def list_images(directory):
    images = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if (
                file.endswith(".jpg")
                or file.endswith(".png")
                or file.endswith(".jpeg")
                or file.endswith(".gif")
                or file.endswith(".webp")
                or file.endswith(".mp4")
            ):
                image_path = os.path.join(root, file)
                image_path = image_path.replace("./static", "")
                images.append(image_path)
    return images


def list_html_files(directory):
    html_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files


def check_image_usage(file):
    with open(file, "r") as f:
        content = f.read()
        used_images = re.findall(regex, content)
        for image in used_images:
            if image in images:
                images.remove(image)


images = set(list_images(images_dir))
print(f"Images in {images_dir}: {len(images)}")


html_files = list_html_files(html_dir)
print(f"HTML files in {html_dir}: {len(html_files)}")

for file in html_files:
    check_image_usage(file)

print(f"Unused images: {len(images)}")
for image in images:
    print(image)

archive_folder = "./static/images/unused/"
if not os.path.exists(archive_folder):
    os.makedirs(archive_folder)

for image in images:
    image_path = f"./static{image}"
    new_path = f"{archive_folder}{image.split('/')[-1]}"
    os.rename(image_path, new_path)
    print(f"Moved {image_path} to {new_path}")
