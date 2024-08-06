import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";

const PostForm = () => {
  const [formDataState, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [loading,setLoading]=useState(false);

  const handleChange = (e) => {
    setFormData({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFormData({
          ...formDataState,
          image: file,
          imagePreview: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formDataState, image: null, imagePreview: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", formDataState.title);
    formData.append("content", formDataState.content);
    if (formDataState.image) {
      formData.append("image", formDataState.image);
    }

    try {
      const response = await fetch("https://og-image-cp1b.onrender.com//generate-og-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.imageUrl) {
        console.log("Image generated successfully:", data.imageUrl);
        setImageUrl(data.imageUrl);
      } else {
        console.error("Error generating image:", data.error || "Unknown error");
      }
    } catch (error) {
        setLoading(false);
      console.error("Error submitting form:", error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-[360px] md:max-w-[460px] mb-4">
        {imageUrl && (
        <Helmet>
          <meta property="og:image" content={imageUrl} />
        </Helmet>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <p className="text-xl font-bold">Generating</p>
            <Loader2 className="animate-spin"/>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-md  mx-auto space-y-4 bg-white p-4 rounded-md shadow-lg"
      >
        <label
          htmlFor="title"
          className="block text-lg font-semibold text-black"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formDataState.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />

        <label
          htmlFor="content"
          className="block text-lg font-semibold text-black"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="4"
          value={formDataState.content}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        ></textarea>

        <label
          htmlFor="image"
          className="block text-lg font-semibold text-black"
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
        {formDataState.imagePreview && (
          <img
            src={formDataState.imagePreview}
            alt="Image Preview"
            className="w-full h-48 object-contain mt-4"
          />
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
        >
          Create Post
        </button>
      </form>
      {imageUrl && (
  <div className="mt-8 mb-4 pb-4 w-full rounded-lg bg-white">

    <img
      src={imageUrl}
      alt="Generated OG Image"
      className="w-full  h-96 object-contain object-center"
    />
    <div className="flex flex-row gap-4 items-center justify-center  w-full m-2 rounded-md h-8 ">

   
    <a href={imageUrl} className="block bg-gray-700 p-2 rounded-lg text-center m-1 text-white w-1/2 " target="_blank">Open image</a>
    </div>
  </div>
)}
    </div>
  );
};

export default PostForm;