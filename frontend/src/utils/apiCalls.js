import axios from "axios";

export const uploadImage = async (file, setLoading) => {
  setLoading(true)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fzc5s9qa");
  formData.append("cloud_name","di2i37eww")
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/di2i37eww/image/upload",
      formData
    );
    const public_id = res.data.public_id;
    const url = res.data.url;
    setLoading(false)
    return { public_id, url };
  } catch (e) {
    setLoading(false)
    console.log(e);
    return {};
  }
};

