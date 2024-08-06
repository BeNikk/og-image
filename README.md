# Dynamic OG Image generation

## Overview
This project is a dynamic post page built using React and Node.js. It generates Open Graph (og:image) images based on the post content and integrates Cloudinary for image storage and management. Users can create posts with titles, content, and optional images. The system then generates a visually appealing og:image, stores it in Cloudinary, and provides the image link.


## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Image Processing**: Canvas,
- **Other Libraries**: Helmet, Multer

## Features

- Dynamic post creation with title, content, and optional image upload.
- Automatic generation of og:image based on post content.
- Storage of og:image in Cloudinary.
- Provision of a direct link for the generated og:image.
- Adding the image as a meta tag.


## System Workflow

1. **User Input**: User submits text and optional image data.
2. **Canvas Image Generation**: Backend generates OG image using Canvas.
3. **Cloudinary Upload**: Generated image is uploaded to Cloudinary.
4. **Cloudinary URL Generation**: Cloudinary generates a unique URL for the image.
5. **API Response**: API returns the Cloudinary image URL.
6. **Client-side Rendering**: Client-side renders the OG image using the returned URL.
7. **Meta Tag Integration**: OG image URL is added as a meta tag (`og:image`) to the HTML header.


## Benefits

* **Dynamic OG Images**: Generate custom OG images based on user input.
* **Scalability**: Cloudinary handles image storage and delivery.(any cdn like s3 could have worked)
* **Performance**: Images served via CDN ensure fast loading times.
* **Security**: Cloudinary provides secure image hosting and SSL encryption.