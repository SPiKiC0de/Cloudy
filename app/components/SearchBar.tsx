import { useState } from "react";

type SearchBoxProps = {
    onSearch: (city: string) => void;
};

function SearchBox({ onSearch }: SearchBoxProps){
    const [isSearching, setIsSearching] = useState(false);
    const [city,setCity] = useState("");





  return (
    <div>
      {!isSearching ? (
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl" onClick={() => setIsSearching(true)}>
          Search City
        </button>
      ) : <div className="">
                <input className= "outline-2 outline-black rounded-2xl text-center bg-white text-black pl-5 pr-5 pt-1 pb-1 mr-2" 
                    placeholder=" Search City..."
                    value={city} 
                    onChange={(e)=>{setCity(e.target.value)}}>
                </input>
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2 text-center leading-5 rounded-3xl" onClick={() => onSearch(city)}>Search</button>
            </div>
            }
    </div>
  );
}

export default SearchBox