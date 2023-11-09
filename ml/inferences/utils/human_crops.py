def people_selector(image, persons_bbox_and_poses):
    person_bbox_coords = []
    cropped_images = []
    for person in persons_bbox_and_poses:
        x, y, w, h = person.bbox
        cropped_image = image[y:y+h, x:x+w]
        person_bbox_coords.append(person.box)
        cropped_images.append(cropped_image)

    return person_bbox_coords, cropped_images
