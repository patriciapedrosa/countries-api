import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";



function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filterParam, setFilterParam] = useState(["All"]);

  //     define a consulta de pesquisa como uma string vazia
  const [q, setQ] = useState("");
  //     define os parâmetros de pesquisa
  //     queremos apenas buscar os países por capital e name
  //     essa lista pode ser mais longa, se você quiser
  //     você pode buscar os países até por sua população
  //     basta adicionar isso ao array
  const [searchParam] = useState(["capital", "name", "numericCode"]);


  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const data = Object.values(items);

  function search(items){
  return items.filter((item) => {
            if (item.region == filterParam) {
                 return searchParam.some((newItem) => {
                   return (
           item[newItem]?.toString()?.toLowerCase()?.indexOf(q.toLowerCase()) > -1
                //mude essa linha no codepen para fazê-la funcionar
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]?.toString()?.toLowerCase()?.indexOf(q.toLowerCase()) > -1
                //mude essa linha no codepen para fazê-la funcionar
                    );
                });
            }
        });
    }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div className="wrapper">
        <div className="search-wrapper">
              <label htmlFor="search-form">
                  <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Search for a country..."
                      value={q}
                    
                      // define o valor de q de nosso useState                                   
                      // sempre que o usuário digitar na busca
                      onChange={(e) => setQ(e.target.value)}
                  />
              </label>
            <div className="select">
                <select
                    // aqui, criamos um input de seleção básico
                    // definimos o valor como o valor selecionado
                    // e atualizamos o state setFilterParam() sempre que onChange for chamado
               
                  onChange={(e) => {
                  setFilterParam(e.target.value);
                   }}
                   className="custom-select"
                   aria-label="Filter Countries By Region">
                    <option value="All">Filter By Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <span className="focus"></span>
            </div>
          </div>
          <ul className="card-grid">
              {search(data).map((item) => (
                  <li>
                      <article className="card" key={item.alpha3Code}>
                          <div className="card-image">
                              <img src={item.flag} alt={item.name} />
                          </div>
                          <div className="card-content">
                              <h2 className="card-name">{item.name}</h2>
                              <div className="card-list">
                                  <div>
                                      Population:{" "}
                                      <span>{item.population}</span>
                                  </div>
                                  <div>
                                      Region: <span>{item.region}</span>
                                  </div>
                                  <div>
                                      Capital: <span>{item.capital}</span>
                                  </div>
                              </div>
                          </div>
                      </article>
                  </li>
              ))}
          </ul>
      </div>
    );
  }

}


export default App;
