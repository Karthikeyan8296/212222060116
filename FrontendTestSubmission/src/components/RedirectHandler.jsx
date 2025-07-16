import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { slug } = useParams();

  useEffect(() => {
    const storedLinks =
      JSON.parse(localStorage.getItem("shortenedLinks")) || {};
    const matched = storedLinks[slug];

    if (matched) {
      window.location.href = matched.originalUrl;
    } else {
      alert("Short URL not found.");
    }
  }, [slug]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
