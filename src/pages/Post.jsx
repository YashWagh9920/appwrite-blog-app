import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite_services/storageServices";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    storageService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const getImageUrl = (featuredImage) => {
    if (!featuredImage) return null;
    if (
      typeof featuredImage === "string" &&
      (featuredImage.startsWith("http://") ||
        featuredImage.startsWith("https://"))
    ) {
      return featuredImage;
    }
    if (storageService.getFileView) {
      const r = storageService.getFileView(featuredImage);
      if (r?.href) return r.href;
      if (typeof r === "string") return r;
    }
    if (storageService.filePreview) {
      const r = storageService.filePreview(featuredImage);
      if (r?.href) return r.href;
      if (typeof r === "string") return r;
    }
    return null;
  };

  const placeholderDataURI =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#94a3b8' font-family='Arial' font-size='20'>No image available</text></svg>`
    );

  return post ? (
    <div className="py-8">
      <Container>
        {/* SIDE-BY-SIDE LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl overflow-hidden p-4 flex items-center justify-center">
            <img
              src={getImageUrl(post.featuredImage) || placeholderDataURI}
              alt={post.title}
              loading="lazy"
              className="w-full h-[320px] md:h-[420px] lg:h-[480px] object-contain"
              style={{ backgroundColor: "#ffffff" }}
            />
          </div>

          {/* TEXT + BUTTONS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            {/* Buttons at top right */}
            {isAuthor && (
              <div className="flex gap-3 mb-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Content */}
            <div className="browser-css prose max-w-none">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
