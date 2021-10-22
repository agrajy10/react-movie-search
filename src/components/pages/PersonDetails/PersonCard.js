import Info from "./Info";
import { formatDate } from "../../../utils/utility";
export default function PersonCard({
  profile_path,
  name,
  birthday,
  biography,
}) {
  return (
    <>
      <div className="h-96 w-full mb-3">
        {profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="https://fakeimg.pl/450x450/"
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-5">
        <h1 className="text-primary-color text-3xl font-bold mb-3">{name}</h1>
        {!!birthday && (
          <p className="mb-3 text-base">
            Date of birth : {formatDate(birthday)}
          </p>
        )}
        {!!biography && <Info biography={biography} />}
      </div>
    </>
  );
}
