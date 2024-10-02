import os
import sys
import re

scripts_dir = sys.path[0]
parent_dir = os.path.abspath(os.path.join(scripts_dir, os.pardir))
os.chdir(parent_dir)

dir = "./docs/"
regex = r'<img src="(\/images\/\S*)"'


def check_image_links(file):
    with open(file, "r") as f:
        content = f.read()
        images = re.findall(regex, content)
        if len(images) == 0:
            return
        print(f"Checking {file} for images: {len(images)} links found")
        for image in images:
            if not os.path.exists(f"docs{image}"):
                print(f"*** Image {image} does not exist in {file}")


def list_html_files(directory):
    html_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files


html_files = list_html_files(dir)

for file in html_files:
    check_image_links(file)

print("Done")
