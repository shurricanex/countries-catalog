import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      }
    };
  };
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: { root: string; suffixes: string[] };
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  continents: string[];
  capital: string[];
  maps: { googleMaps: string; openStreetMaps: string };
  population: number;
  timezones: string[];
  startOfWeek: string;

}



export const useCountriesStore = defineStore("countriesStore", () => {
  const countries = ref<Country[]>([]);
  async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    countries.value = await response.json()
  }

  return {
    countries,
    fetchCountries
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCountriesStore, import.meta.hot));
}
