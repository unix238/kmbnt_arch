import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ArrowRight } from "../components/UI/Icons/ArrowRight";

import "../style/items.css";
import { Recent } from "../components/UI/Recent/Recent";
import { ItemCard } from "../components/UI/ItemCard/ItemCard";
import ServiceApi from "../api/ServiceApi";
import { Pagination } from "../components/UI/Pagination/Pagination";
import { Loader } from "../components/UI/Loader/Loader";
import { Header } from "../components/UI/Header/Header";
import { ContactForm } from "../components/UI/ContactForm/ContactForm";
import { Button } from "../components/UI/Button/Button";

export const Items = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpenned, setIsFilterOpenned] = useState(false);
  const [isSortOpenned, setIsSortOpenned] = useState(false);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [brands, setBrands] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const [filters, setFilters] = useState({
    price: "",
    tags: [],
    sort: "",
    category: [],
    brand: [],
    size: [],
    seller: "",
    ...location.state,
  });

  const addFilter = (filterName, filterValue) => {
    if (filterName === "sort") {
      setFilters({ ...filters, [filterName]: filterValue });
      return;
    }
    if (filters[filterName].includes(filterValue)) return;
    setFilters({
      ...filters,
      [filterName]: [...filters[filterName], filterValue],
    });
  };

  const isFiltersEmpty = () => {
    return (
      filters?.category?.length === 0 &&
      filters?.brand?.length === 0 &&
      filters?.tags?.length === 0 &&
      filters?.price === "" &&
      filters?.sort === ""
    );
  };

  const loadData = async () => {
    if (location.state) {
      addFilter(
        Object.keys(location.state)[0],
        Object.values(location.state)[0]
      );
      navigate(location.pathname, {});
      // window.history.replaceState({}, document.title);
    }
    if (!isFiltersEmpty()) {
      console.log("FILTERS");
      const req = await ServiceApi.getFilteredItems(filters, page, 12);
      setFilteredItems(req.data);
      setTotalPages(Math.ceil(req.headers["x-total-count"] / 12));
      setIsLoading(false);
    } else {
      console.log(filters);
      const fetchedItems = await ServiceApi.getItems(page);
      setFilteredItems(fetchedItems.data);
      setTotalPages(Math.ceil(fetchedItems.headers["x-total-count"] / 12));
    }

    const fetchedTags = await ServiceApi.getTags();
    setTags(fetchedTags);
    const fetcgedCategories = await ServiceApi.getCategories();
    setCategories(fetcgedCategories);
    const fetchedBrands = await ServiceApi.getBrands();
    setBrands(fetchedBrands);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadData();
    console.log("uses effect");
  }, [filters, page, location.state]);

  const applyFilters = async () => {};

  return (
    <div>
      <Header />
      <div className='wrapper items__page'>
        <div className='options'>
          <div className='filters'>
            <div
              className='filters__nav'
              onClick={() => {
                setIsFilterOpenned(!isFilterOpenned);
              }}
            >
              <ArrowRight />
              <div className='options__text'>Фильтры</div>
            </div>
            {isFilterOpenned && (
              <div className='filters__items'>
                <div
                  className='filters__nav filters__nav__inside'
                  onClick={() => {
                    setIsFilterOpenned(!isFilterOpenned);
                  }}
                >
                  <div className='filters__arrow open'>
                    <ArrowRight />
                  </div>
                  <div className='filters__title'>Фильтры</div>
                </div>
                <div className='filters__item'>
                  <div className='filters__title'>
                    <div className='filters__arrow open'>
                      <ArrowRight />
                    </div>
                    Категории
                  </div>
                  <div className='filter__open filters__subtitles'>
                    {categories.map((category) => (
                      <div
                        className='filters__subtitle'
                        key={`categggory${category._id}`}
                      >
                        <input
                          type='checkbox'
                          name=''
                          id={category._id}
                          checked={filters.category.includes(category._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addFilter("category", category._id);
                            } else {
                              setFilters({
                                ...filters,
                                category: filters.category.filter(
                                  (id) => id !== category._id
                                ),
                              });
                            }
                          }}
                          className='filters__checkbox'
                        />
                        <label
                          htmlFor={category._id}
                          className='filters__label'
                        >
                          {category.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='filters__item'>
                  <div className='filters__title'>
                    <div className='filters__arrow open'>
                      <ArrowRight />
                    </div>
                    Бренды
                  </div>
                  <div className='filter__open filters__subtitles'>
                    {brands.map((brand) => (
                      <div
                        className='filters__subtitle'
                        key={`brand${brand._id}`}
                      >
                        <input
                          type='checkbox'
                          name=''
                          id={brand._id}
                          checked={filters.brand.includes(brand._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addFilter("brand", brand._id);
                            } else {
                              setFilters({
                                ...filters,
                                brand: filters.brand.filter(
                                  (id) => id !== brand._id
                                ),
                              });
                            }
                          }}
                          className='filters__checkbox'
                        />
                        <label htmlFor={brand._id}>{brand.title}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='filters__item'>
                  <div className='filters__title'>
                    <div className='filters__arrow open'>
                      <ArrowRight />
                    </div>
                    Тэги
                  </div>
                  <div className='filters__subtitles filter__open'>
                    {tags.map((tag) => (
                      <div
                        className='filters__subtitle'
                        key={`taggs${tag._id}`}
                      >
                        <input
                          type='checkbox'
                          name={tag._id}
                          id={tag._id}
                          checked={filters.tags.includes(tag._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addFilter("tags", tag._id);
                            } else {
                              setFilters({
                                ...filters,
                                tags: filters.tags.filter(
                                  (id) => id !== tag._id
                                ),
                              });
                            }
                          }}
                          className='filters__checkbox'
                        />
                        <label htmlFor={tag._id}>{tag.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='filters__item'>
                  <div className='filters__title'>
                    <div className='filters__arrow open'>
                      <ArrowRight />
                    </div>
                    Цена
                  </div>
                  <div className='filters__subtitles filter__open'>
                    <div className='filters__subtitle'>
                      От
                      <input
                        type='number'
                        name=''
                        id=''
                        value={0}
                        onChange={() => {}}
                        className='filters__price'
                      />
                      до
                      <input
                        type='number'
                        name=''
                        id=''
                        value={0}
                        onChange={() => {}}
                        className='filters__price'
                      />
                    </div>
                  </div>
                </div>

                <Button
                  text={"Применить фильтры"}
                  style={{ width: "100%", height: 51 }}
                  onClick={applyFilters}
                />
              </div>
            )}
          </div>
          <div className='sortings'>
            <div
              className='sortings'
              onClick={() => {
                setIsSortOpenned(!isSortOpenned);
              }}
            >
              <div>Сортировка</div>
              <div>
                <ArrowRight />
              </div>
            </div>

            {isSortOpenned && (
              <div className='sort__items'>
                <div
                  className='filters__nav filters__nav__inside'
                  onClick={() => {
                    setIsSortOpenned(!isSortOpenned);
                  }}
                >
                  <div className='filters__arrow open'>
                    <ArrowRight />
                  </div>
                  <div className='filters__title'>Сортировка</div>
                </div>
                <div className='sort__item'>
                  <input
                    type='radio'
                    name='sort'
                    id='asc'
                    onChange={() => {
                      addFilter("sort", "asc");
                    }}
                  />
                  <label htmlFor='asc'>Цена (по возрастанию)</label>
                </div>

                <div className='sort__item'>
                  <input
                    type='radio'
                    name='sort'
                    id='desc'
                    onChange={() => {
                      addFilter("sort", "desc");
                    }}
                  />
                  <label htmlFor='desc'>Цена (по убыванию)</label>
                </div>

                <div className='sort__item'>
                  <input
                    type='radio'
                    name='sort'
                    id='date'
                    onChange={() => {
                      addFilter("sort", "date");
                    }}
                  />
                  <label htmlFor='date'>Дата добавления</label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='items__list'>
          {isLoading ? (
            <div style={{ height: "80vh", width: "1000px" }}>
              <Loader />
            </div>
          ) : (
            filteredItems.map((item) => (
              <div className='items__item'>
                <ItemCard key={`${item._id}items__items`} item={item} />
              </div>
            ))
          )}
        </div>
        <Pagination totalPages={totalPages} setPage={setPage} />
      </div>
      <Recent />
      <ContactForm />
    </div>
  );
};
