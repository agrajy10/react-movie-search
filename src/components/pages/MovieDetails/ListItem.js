import React from "react";

export default function ListItem({ name, profile_path }) {
  return (
    <li className="mb-2 flex items-center justify-start">
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
    </li>
  );
}
