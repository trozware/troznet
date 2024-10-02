import os
import sys

scripts_dir = sys.path[0]
parent_dir = os.path.abspath(os.path.join(scripts_dir, os.pardir))
os.chdir(parent_dir)

year = "2024"
directory = f"./content/post/{year}"


def list_md_files(directory):
    md_files = []
    for file_name in os.listdir(directory):
        if file_name.endswith(".md") or file_name.endswith(".markdown"):
            file_path = os.path.join(directory, file_name)
            md_files.append(file_path)
    return md_files


def list_image_links(file):
    with open(file, "r") as f:
        content = f.readlines()
        images = [line.rstrip() for line in content if "]: /images/" in line]
        return images


def list_image_files(all_image_links):
    image_links = []
    for i in all_image_links:
        if len(i) > 0:
            image_links += i
    images = [link.split("/images/", 1)[1] for link in image_links]
    return images


def move_images(images):
    images_folder = f"./static/images/"
    year_folder = f"./static/images/{year}/"

    # create year folder if it doesn't exist
    if not os.path.exists(year_folder):
        os.makedirs(year_folder)

    # move images to year folder
    for image in images:
        # check if image exists
        if not os.path.exists(f"{images_folder}{image}"):
            print(f"*** Image {image} does not exist")
            continue
        os.rename(f"{images_folder}{image}", f"{year_folder}{image}")
        print(f"Moved {image} to {year_folder}")


def edit_image_refs(file):
    with open(file, "r") as f:
        content = f.readlines()
        for i in range(len(content)):
            if "]: /images/" in content[i]:
                content[i] = content[i].replace("]: /images/", f"]: /images/{year}/")
        with open(file, "w") as f:
            f.writelines(content)


files = list_md_files(directory)
# print(files)
all_image_links = [list_image_links(file) for file in files]
# print(all_image_links)
images = list_image_files(all_image_links)
# print(images)

if len(images) > 0:
    move_images(images)
    for file in files:
        edit_image_refs(file)
else:
    print("No images found")
