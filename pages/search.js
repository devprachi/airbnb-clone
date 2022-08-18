import { format } from "date-fns";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const dateRange = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${location} | ${dateRange} | ${numberOfGuests} guests`}
      />
      <main className="flex flex-col">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {dateRange} - {numberOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden sm:inline-flex space-x-3 text-gray-800 mb-5 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="border-t" />
          {searchResults?.map(
            (
              { img, description, location, title, star, price, total },
              idx
            ) => {
              return (
                <InfoCard
                  key={idx}
                  img={img}
                  title={title}
                  description={description}
                  location={location}
                  star={star}
                  price={price}
                  total={total}
                />
              );
            }
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return { props: { searchResults } };
}
