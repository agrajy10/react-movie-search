import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ id, name, profile_path }) {
  return (
    <li className="mb-2">
      <Link
        className="flex items-center justify-start hover:text-gray-500 transition-colors duration-300"
        to={`/person/${id}`}
      >
        {profile_path && (
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img
              src={`https://image.tmdb.org/t/p/w45${profile_path}`}
              alt={`Actor ${name}`}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {name}
      </Link>
    </li>
  );
}
