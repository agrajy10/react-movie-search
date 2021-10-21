import { useQuery } from "react-query";
import { useParams } from "react-router";
import { formatDate, getPersonDetails } from "../../../utils/utility";
import Loader from "../../Loader";
import Info from "./Info";
export default function PersonDetails() {
  const { id: personID } = useParams();
  const {
    data: personDetails,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(["person-details", personID], () => getPersonDetails(personID), {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    enabled: !!personID,
    retry: false,
    staleTime: Infinity,
  });
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-14">
      {isLoading && <Loader />}
      {isError && (
        <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
          An error occurred. Try again later.
        </div>
      )}
      {isSuccess && (
        <div className="grid grid-cols-12 gap-4">
          <aside className="col-span-12 sm:col-span-4 bg-white rounded-lg overflow-hidden shadow text-gray-600 text-sm">
            <div className="h-96 w-full mb-3">
              {personDetails.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
                  alt={personDetails.name}
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
              <h1 className="text-primary-color text-3xl font-bold mb-3">
                {personDetails.name}
              </h1>
              {!!personDetails.birthday && (
                <p className="mb-3 text-base">
                  Date of birth : {formatDate(personDetails.birthday)}
                </p>
              )}
              {!!personDetails.biography && (
                <Info biography={personDetails.biography} />
              )}
            </div>
          </aside>
          <div className="col-span-12 sm:col-span-8"></div>
        </div>
      )}
    </main>
  );
}
