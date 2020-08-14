import React from "react";
import { useParams } from "react-router-dom";

export const MoviePage: React.FC = () => {
  let { slug } = useParams();
  return (
    <div>
      <div>Movie page</div>
      <div>{slug}</div>
    </div>
  );
};
